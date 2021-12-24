import { Module } from 'vuex';
import { IRootState } from '../types';
import { ILoginState } from './types';
import { IAccount } from '@/service/login/types';
import localCache from '@/utils/cache';
import { accountLogin, getUserInfoById, getUserMenusByRoleId } from '@/service/login';
import router from '@/router';
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus';
import { handlePassword } from '@/utils/handle-password';

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: null,
      userMenu: [],
      permissions: []
    };
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeUserMenu(state, userMenu) {
      state.userMenu = userMenu;

      // 将 userMenu 映射到 routes 中
      const routes = mapMenusToRoutes(userMenu);
      routes.forEach((route) => router.addRoute('main', route));

      // 获取用户具有的权限
      const permissions = mapMenusToPermission(userMenu);
      state.permissions = permissions;
    }
  },
  actions: {
    async loginAction({ commit, dispatch }, payload: IAccount) {
      try {
        // 1.实现登录逻辑
        const {
          data: { id, token }
        } = await accountLogin({ ...payload, password: handlePassword(payload.password) });
        commit('changeToken', token);
        localCache.setCache('blog_token', token);

        // 发送初始化请求(获取完整的role/department)
        dispatch('getInitialDataAction', null, { root: true });

        // 2.请求用户信息
        const { data: userInfo } = await getUserInfoById(id);
        commit('changeUserInfo', userInfo);
        localCache.setCache('blog_userInfo', userInfo);

        // 3.请求用户菜单
        const {
          data: { list: userMenu }
        } = await getUserMenusByRoleId(userInfo.role.id);
        commit('changeUserMenu', userMenu);
        localCache.setCache('blog_userMenu', userMenu);

        // 4. 重定向或跳转到首页
        const { currentRoute } = router;
        const {
          query: { redirect }
        } = currentRoute.value;
        if (redirect && typeof redirect === 'string') {
          router.push(redirect);
        } else {
          router.push('/main');
        }
      } catch (error) {
        return Promise.reject();
      }
    },
    async updateUserInfoAction({ commit }, userId: number) {
      const { data: userInfo } = await getUserInfoById(userId);
      commit('changeUserInfo', userInfo);
      localCache.setCache('blog_userInfo', userInfo);
    },
    loadLocalLogin({ commit, dispatch }) {
      // 页面刷新后读取本地缓存的数据放入 store 中
      const token = localCache.getCache('blog_token');
      if (token) {
        commit('changeToken', token);
      } else {
        return;
      }
      // 发送初始化请求(获取完整的role/department)
      dispatch('getInitialDataAction', null, { root: true });

      const userInfo = localCache.getCache('blog_userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
      const userMenus = localCache.getCache('blog_userMenu');
      if (userMenus) {
        commit('changeUserMenu', userMenus);
      }
    }
  }
};

export default loginModule;

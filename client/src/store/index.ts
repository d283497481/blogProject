import { createStore, useStore as useVuexStore } from 'vuex';
import { IRootState } from './types';
import { getPageListData, accountLogin, getUserInfoById } from '@/service/api';
import { IAccount } from '@/service/types';
import localCache from '@/utils/cache';
import { capitalizeFirstLetter } from '@/utils';

const store = createStore<IRootState>({
  state() {
    return {
      showLoginBox: false,
      token: '',
      userInfo: null,
      labelList: [],
      labelCount: 0,
      postList: [],
      postCount: 0,
      commentList: [],
      commentCount: 0,
      keyword: null,
      label: null
    };
  },
  getters: {
    pageListData(state) {
      return (moduleName: string) => {
        return state[`${moduleName}List`];
      };
    },
    pageListCount(state) {
      return (moduleName: string) => {
        return state[`${moduleName}Count`];
      };
    }
  },
  mutations: {
    changeShowLoginBox(state, flag) {
      state.showLoginBox = flag;
    },
    changeToken(state, token) {
      state.token = token;
    },
    changeUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    changeLabelList(state, list) {
      state.labelList = list;
    },
    changeLabelCount(state, count) {
      state.labelCount = count;
    },
    changePostList(state, list) {
      state.postList = list;
    },
    changePostCount(state, count) {
      state.postCount = count;
    },
    changeCommentList(state, list) {
      state.commentList = list;
    },
    changeCommentCount(state, count) {
      state.commentCount = count;
    },
    changeKeyword(state, keyword) {
      state.keyword = keyword;
    },
    changeLabel(state, label) {
      state.label = label;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { moduleName } = payload;
      const url = `/${moduleName}/list`;
      const {
        data: { list, count }
      } = await getPageListData(url, payload);

      // 保存数据
      commit(`change${capitalizeFirstLetter(moduleName)}List`, list);
      commit(`change${capitalizeFirstLetter(moduleName)}Count`, count);
    },
    async loginAction({ commit, dispatch }, payload: IAccount) {
      try {
        // 1.实现登录逻辑
        const result = await accountLogin(payload);
        commit('changeToken', result.data.token);
        localCache.setCache('blog_index_token', result.data.token);

        // 2.请求用户信息
        const { data: userInfo } = await getUserInfoById(result.data.id);
        commit('changeUserInfo', userInfo);
        localCache.setCache('blog_index_userInfo', userInfo);

        return Promise.resolve(result);
      } catch (error) {
        return Promise.reject(error);
      }
    },
    loadLocalLogin({ commit, dispatch }) {
      // 页面刷新后读取本地缓存的数据放入 store 中
      const token = localCache.getCache('blog_index_token');
      if (token) {
        commit('changeToken', token);
      } else {
        return;
      }
      const userInfo = localCache.getCache('blog_index_userInfo');
      if (userInfo) {
        commit('changeUserInfo', userInfo);
      }
    },
    logoutAction({ commit }) {
      localCache.clearCache();
      store.commit('changeUserInfo', null);
      store.commit('changeToken', '');
    }
  },
  modules: {}
});

export function useStore() {
  return useVuexStore<IRootState>();
}

// 初始化 store 解决页面刷新后 Vuex 缓存数据丢失的问题
export function setupStore() {
  store.dispatch('loadLocalLogin');
}

export default store;

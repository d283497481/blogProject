import { Module } from 'vuex';
import { ElMessageBox, ElMessage } from 'element-plus';
import { IRootState } from '@/store/types';
import { ISystemState } from './types';
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system';
import { handlePassword } from '@/utils/handle-password';

const pageUrlMap: { [key: string]: string } = {
  user: '/user/list',
  role: '/role/list',
  menu: '/menu/list',
  post: '/post/list',
  label: '/label/list'
};

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      userList: [],
      userCount: 0,
      menuList: [],
      menuCount: 0,
      roleList: [],
      roleCount: 0,
      postList: [],
      postCount: 0,
      labelList: [],
      labelCount: 0,
      queryInfo: {}
    };
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        return state[`${pageName}List`];
      };
    },
    pageListCount(state) {
      return (pageName: string) => {
        return state[`${pageName}Count`];
      };
    }
  },
  mutations: {
    changeUserList(state, list) {
      state.userList = list;
    },
    changeUserCount(state, count) {
      state.userCount = count;
    },
    changeRoleList(state, list) {
      state.roleList = list;
    },
    changeRoleCount(state, count) {
      state.roleCount = count;
    },
    changeMenuList(state, list) {
      state.menuList = list;
    },
    changeMenuCount(state, count) {
      state.menuCount = count;
    },
    changePostList(state, list) {
      state.postList = list;
    },
    changePostCount(state, count) {
      state.postCount = count;
    },
    changeLabelList(state, list) {
      state.labelList = list;
    },
    changeLabelCount(state, count) {
      state.labelCount = count;
    },
    changeQueryInfo(state, queryInfo) {
      state.queryInfo = queryInfo;
    }
  },
  actions: {
    async getPageListAction({ commit }, payload: any) {
      const { pageName, queryInfo } = payload;
      const pageUrl: string = pageUrlMap[pageName];
      const {
        data: { list, count }
      } = await getPageListData(pageUrl, queryInfo);
      switch (pageName) {
        case 'user':
          commit('changeUserList', list);
          commit('changeUserCount', count);
          break;
        case 'role':
          commit('changeRoleList', list);
          commit('changeRoleCount', count);
          break;
        case 'menu':
          commit('changeMenuList', list);
          commit('changeMenuCount', count);
          break;
        case 'post':
          commit('changePostList', list);
          commit('changePostCount', count);
          break;
        case 'label':
          commit('changeLabelList', list);
          commit('changeLabelCount', count);
          break;
      }
      commit('changeQueryInfo', queryInfo);
    },
    async deletePageDataAction({ dispatch, state }, payload: any) {
      ElMessageBox.confirm('此操作将永久删除此数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 1.获取 pageName 和 id 组成 url
          const { pageName, id } = payload;
          const pageUrl = `${pageName}/${id}`;
          // 2.发送网络请求
          await deletePageData(pageUrl);
          // 3.重新请求数据
          dispatch('getPageListAction', {
            pageName,
            queryInfo: state.queryInfo
          });
        })
        .catch(() => {
          ElMessage.info('已取消删除');
        });
    },
    async createPageDataAction({ dispatch, state }, payload: any) {
      const { pageName, newData } = payload;
      const pageUrl = `/${pageName}`;
      if (pageName === 'user') {
        newData.password = handlePassword(newData.password);
      }
      await createPageData(pageUrl, newData);

      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.queryInfo
      });
    },
    async editPageDataAction({ dispatch, state }, payload: any) {
      const { pageName, editData, id } = payload;
      const pageUrl = `/${pageName}/${id}`;
      await editPageData(pageUrl, editData);
      dispatch('getPageListAction', {
        pageName,
        queryInfo: state.queryInfo
      });
    }
  }
};

export default systemModule;

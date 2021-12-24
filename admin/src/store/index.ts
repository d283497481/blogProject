import { createStore, useStore as useVuexStore } from 'vuex';
import { IRootState, IRootWithModule } from './types';
import { getPageListData } from '@/service/main/system/system';
import login from './login';
import system from './main/system/system';

const store = createStore<IRootState>({
  state() {
    return {
      entireRole: [],
      entireMenu: [],
      entireLabel: []
    };
  },
  mutations: {
    changeEntireRole(state, list) {
      state.entireRole = list;
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list;
    },
    changeEntireLabel(state, list) {
      state.entireLabel = list;
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 1.请求全局数据(角色、菜单、标签)
      const {
        data: { list: roleList }
      } = await getPageListData('/role/list', {
        pageSize: 1000,
        pageNum: 1
      });
      const {
        data: { list: menuList }
      } = await getPageListData('/menu/list', {
        pageSize: 1000,
        pageNum: 1
      });
      const {
        data: { list: labelList }
      } = await getPageListData('/label/list', {
        pageSize: 1000,
        pageNum: 1
      });

      // 保存数据
      commit('changeEntireRole', roleList);
      commit('changeEntireMenu', menuList);
      commit('changeEntireLabel', labelList);
    }
  },
  modules: {
    login,
    system
  }
});

// 初始化 store 解决页面刷新后 Vuex 缓存数据丢失的问题
export function setupStore() {
  store.dispatch('login/loadLocalLogin');
}

// 返回带有模块属性的 store hook
export function useStore() {
  return useVuexStore<IRootWithModule>();
}

export default store;

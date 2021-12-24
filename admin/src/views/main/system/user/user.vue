<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="user"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="{ row }">
        <el-switch
          v-model="row.status"
          active-color="#13ce66"
          inactive-color="#ff4949"
          :active-value="1"
          :inactive-value="0"
          @click="handleStatusChange(row)"
        />
      </template>
    </page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      pageName="user"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import { computed, Ref } from 'vue';
import { useStore } from '@/store';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';
import { updateUsertatus } from '@/service/main/system/system';

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch();

// 1.处理密码输入项的显示逻辑
const newCallback = () => {
  const usernameItem = modalConfig.formItems.find((item) => item.field === 'name');
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password');
  usernameItem!.isHidden = false;
  passwordItem!.isHidden = false;
  modalConfig.title = '新建用户';
};
const editCallback = () => {
  const usernameItem = modalConfig.formItems.find((item) => item.field === 'name');
  const passwordItem = modalConfig.formItems.find((item) => item.field === 'password');
  usernameItem!.isHidden = true;
  passwordItem!.isHidden = true;
  modalConfig.title = '编辑用户';
};
// 2.动态添加部门和角色列表
const store = useStore();
const modalConfigRef = computed(() => {
  const roleItem = modalConfig.formItems.find((item) => item.field === 'role_id');
  roleItem!.options = store.state.entireRole.map((item: any) => {
    return { name: item.name, value: item.id };
  });
  return modalConfig;
});

// 3.调用 hook 获取公共变量和函数
const { pageModalRef, defaultInfo, handleNewData, handleEditData } = usePageModal(
  newCallback,
  editCallback
);

// 更改用户状态处理函数
const handleStatusChange = (user: any) => {
  const { id, status } = user;
  updateUsertatus(id, status).finally(() => handleQueryClick(store.state.system.queryInfo));
};
</script>

<style scoped></style>

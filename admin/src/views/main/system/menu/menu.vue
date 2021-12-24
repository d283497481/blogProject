<template>
  <div class="menu">
    <page-content
      pageName="menu"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="menu"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageModal } from '@/hooks/usePageModal';

const newCallback = () => {
  modalConfig.title = '新建菜单';
};
const editCallback = () => {
  modalConfig.title = '编辑菜单';
};
const { pageModalRef, defaultInfo, handleNewData, handleEditData } = usePageModal(
  newCallback,
  editCallback
);
</script>

<style scoped></style>

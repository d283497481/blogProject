<template>
  <div class="label">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      pageName="label"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      pageName="label"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    >
    </page-modal>
  </div>
</template>

<script lang="ts" setup>
import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';
import PageModal from '@/components/page-modal';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';
import { modalConfig } from './config/modal.config';

import { usePageSearch } from '@/hooks/usePageSearch';
import { usePageModal } from '@/hooks/usePageModal';

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch();

const newCallback = () => {
  modalConfig.title = '新建标签';
};
const editCallback = () => {
  modalConfig.title = '编辑标签';
};

const { pageModalRef, defaultInfo, handleNewData, handleEditData } = usePageModal(
  newCallback,
  editCallback
);
</script>

<style scoped></style>

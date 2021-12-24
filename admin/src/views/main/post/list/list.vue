<template>
  <div class="postlist">
    <page-search
      :searchFormConfig="searchFormConfigRef"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content ref="pageContentRef" pageName="post" :contentTableConfig="contentTableConfig">
      <template #headerHandler>
        <el-button @click="handleCreateClick" size="mini" type="primary">写文章</el-button>
      </template>
      <template #labels="{ row }">
        <template v-for="label in row.labels" :key="label.id">
          <el-tag size="small">{{ label.name }}</el-tag
          >&nbsp;
        </template>
      </template>
      <template #user="{ row }">
        <span> {{ row.user.nickname ?? row.user.name }} </span>
      </template>
      <template #handler="{ row }">
        <el-button @click="handleEditClick(row)" type="text" size="mini" icon="el-icon-edit"
          >编辑</el-button
        >
        <el-button
          @click="handleDeleteClick(row)"
          type="text"
          size="mini"
          icon="el-icon-delete"
          style="color: #f56c6c"
          >删除</el-button
        >
      </template>
    </page-content>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

import PageSearch from '@/components/page-search';
import PageContent from '@/components/page-content';

import { searchFormConfig } from './config/search.config';
import { contentTableConfig } from './config/content.config';

import { usePageSearch } from '@/hooks/usePageSearch';

const store = useStore();
const searchFormConfigRef = computed(() => {
  const labelItem = searchFormConfig.formItems.find((item) => item.field === 'labels');
  labelItem!.options = store.state.entireLabel.map((item) => {
    return { name: item.name, value: item.id };
  });
  return searchFormConfig;
});

const { pageContentRef, handleResetClick, handleQueryClick } = usePageSearch();

const router = useRouter();
const handleCreateClick = () => {
  router.push('/main/post/edit');
};
const handleEditClick = (rowData: any) => {
  router.push({ path: '/main/post/edit', query: { postId: rowData.id } });
};
const handleDeleteClick = (rowData: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: 'post',
    id: rowData.id
  });
};
</script>

<style scoped></style>

<template>
  <div class="page-content">
    <custom-table
      :dataList="dataList"
      :dataCount="dataCount"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- header中的插槽 -->
      <template #headerHandler>
        <slot name="headerHandler">
          <el-button size="mini" icon="" type="primary" @click="handleNewClick">新建</el-button>
        </slot>
      </template>
      <!-- 列中的插槽 -->
      <template #createAt="{ row }">
        <div>{{ $filters.formatTime(row.createAt) }}</div>
      </template>
      <template #updateAt="{ row }">
        <div>{{ $filters.formatTime(row.updateAt) }}</div>
      </template>
      <template #handler="{ row }">
        <slot name="handler" :row="row">
          <el-button type="text" size="mini" icon="el-icon-edit" @click="handleEditClick(row)"
            >编辑</el-button
          >
          <el-button
            type="text"
            size="mini"
            icon="el-icon-delete"
            style="color: #f56c6c"
            @click="handleDeleteClick(row)"
            >删除</el-button
          >
        </slot>
      </template>

      <!-- 在 page-content 中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" :key="item.prop" #[item.slotName]="{ row }">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="row"></slot>
        </template>
      </template>
    </custom-table>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, defineProps, defineEmits, defineExpose } from 'vue';
import { useStore } from '@/store';
import CustomTable from '@/base-ui/table';

const props = defineProps<{
  contentTableConfig: any;
  pageName: string;
}>();
const emit = defineEmits(['newBtnClick', 'editBtnClick']);

const store = useStore();

// 1.双向绑定 pageInfo
const pageInfo = ref({ pageNum: 1, pageSize: 50 });
watch(pageInfo, () => getPageData());

// 2.发送网络请求
const getPageData = (queryInfo: any = {}, resetPageNum = false) => {
  if (resetPageNum) pageInfo.value.pageNum = 1;
  store.dispatch('system/getPageListAction', {
    pageName: props.pageName,
    queryInfo: {
      ...pageInfo.value,
      ...queryInfo
    }
  });
};
getPageData();

// 3.从vuex中获取网络请求返回的数据
const dataList = computed(() => store.getters['system/pageListData'](props.pageName));
const dataCount = computed(() => store.getters['system/pageListCount'](props.pageName));

// 4.获取其它的的动态插槽名称
const otherPropSlots = props.contentTableConfig.propList.filter((item: any) => {
  return !['createAt', 'updateAt', 'handler'].includes(item.slotName);
});

// 5.删除、编辑、新建操作
const handleDeleteClick = (item: any) => {
  store.dispatch('system/deletePageDataAction', {
    pageName: props.pageName,
    id: item.id
  });
};
const handleNewClick = () => {
  emit('newBtnClick');
};
const handleEditClick = (item: any) => {
  emit('editBtnClick', item);
};

// 6.将组件中的方法暴露出去
defineExpose({
  getPageData
});
</script>

<style lang="less" scoped>
.page-content {
  padding: 12px;
}
</style>

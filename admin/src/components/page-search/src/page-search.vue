<template>
  <div class="page-search">
    <custom-form v-bind="searchFormConfig" v-model="formData">
      <template #footer>
        <el-button @click="handleResetClick" size="mini" icon="el-icon-refresh-left"
          >重置</el-button
        >
        <el-button @click="handleQueryClick" size="mini" type="primary" icon="el-icon-search"
          >搜索</el-button
        >
      </template>
    </custom-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, withDefaults } from 'vue';
import CustomForm, { IForm } from '@/base-ui/form';

const props = withDefaults(
  defineProps<{
    searchFormConfig: IForm;
  }>(),
  {}
);
const emit = defineEmits(['resetBtnClick', 'queryBtnClick']);

// 取出配置文件中传入的查询字段
const formItems = props.searchFormConfig.formItems;
const formOriginData: any = {};
for (const item of formItems) {
  formOriginData[item.field] = null;
}
const formData = ref(formOriginData);

// 重置查询参数
const handleResetClick = () => {
  for (const key in formData.value) {
    formData.value[key] = null;
  }
  emit('resetBtnClick');
};

// 搜索按钮点击事件
const handleQueryClick = () => {
  emit('queryBtnClick', formData.value);
};
</script>

<style lang="less">
.page-search {
  .footer {
    text-align: right;
    padding: 0 20px 12px 0;
  }
}
</style>

<template>
  <div class="page-editor">
    <custom-form v-model="formData" v-bind="editorConfig"></custom-form>
    <slot></slot>
    <div class="footer">
      <el-button @click="submit" type="success" icon="el-icon-s-promotion" size="small"
        >提交</el-button
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, withDefaults, defineProps } from 'vue';
import { ElMessage } from 'element-plus';

import CustomForm from '@/base-ui/form';
import { createPost, addPostLabel, addPostImage, updatePost } from '@/service/main/post';

const props = withDefaults(
  defineProps<{
    editorConfig: any;
    defaultInfo?: any;
    otherInfo?: any;
    mode: 'create' | 'update';
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({})
  }
);

const formData = ref<any>({});

watch(
  () => props.defaultInfo,
  (newVal) => {
    for (const item of props.editorConfig.formItems) {
      formData.value[`${item.field}`] = newVal[`${item.field}`];
    }
  }
);

const submit = async () => {
  try {
    let { title, labels, abstract } = formData.value;
    const { image, content } = props.otherInfo;
    if (!/\S/.test(title)) {
      ElMessage.warning('文章标题不能为空~');
    }
    if (!/\S/.test(content)) {
      ElMessage.warning('文章内容不能为空~');
    }
    if (!labels) labels = [];
    let result: any;
    let postId: number;
    if (props.mode === 'create') {
      const {
        data: { insertId }
      } = await createPost(title, abstract, content);
      postId = insertId;
    } else if (props.mode === 'update') {
      await updatePost(props.defaultInfo.id, title, abstract, content);
      postId = props.defaultInfo.id;
    }
    await addPostLabel(postId!, labels);
    if (image) {
      const imgForm = new FormData();
      imgForm.append('picture', image.raw);
      await addPostImage(postId!, imgForm);
    }
    ElMessage.success('提交文章成功~');
  } catch (error) {
    ElMessage.error('提交文章失败~');
  }
};
</script>

<style lang="less" scoped>
.page-editor {
  padding-bottom: 10px;
  .footer {
    margin-top: 16px;
    text-align: center;
  }
}
</style>

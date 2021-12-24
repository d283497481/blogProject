<template>
  <div class="edit">
    <page-editor
      :mode="editorMode"
      :editorConfig="editorConfigRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <template #default>
        <item-box label="配图" :labelWidth="editorConfigRef.labelWidth">
          <upload-img
            :originImg="originImg"
            @deleteOriginImg="deleteOringinImgHandler"
            @fileChange="handleFileChange"
          />
        </item-box>
        <item-box label="内容" :labelWidth="editorConfigRef.labelWidth">
          <v-md-editor v-model="otherInfo.content" height="400px"></v-md-editor>
        </item-box>
      </template>
    </page-editor>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';

import PageEditor from '@/components/page-editor';
import ItemBox from './cpn/item-box.vue';
import UploadImg from './cpn/upload.vue';

import { editorConfig } from './config/editor.config';
import { IOthterInfo } from './types';
import { useUploadImg } from './hooks/useUploadImg';
import { getPostDetails } from '@/service/main/post';

const store = useStore();
const editorConfigRef = computed(() => {
  const labelItem = editorConfig.formItems.find((item) => item.field === 'labels');
  labelItem!.options = store.state.entireLabel.map((item) => {
    return { name: item.name, value: item.id };
  });
  return editorConfig;
});

const editorMode = ref<'create' | 'update'>('create');
const defaultInfo = ref({});

const otherInfo = ref<IOthterInfo>({
  image: null,
  content: ''
});
const { originImg, deleteOringinImgHandler, handleFileChange } = useUploadImg(otherInfo);

const route = useRoute();
if (route.query.postId) {
  // 修改文章时，获取文章详情
  const { postId } = route.query;
  const queryPostDetails = async (postId: number) => {
    const {
      data: { labels, post }
    } = await getPostDetails(postId);
    const { title, image, abstract, content } = post;
    defaultInfo.value = {
      id: postId,
      title,
      abstract,
      labels: labels.map((item: any) => item.id)
    };
    otherInfo.value.content = content;
    if (image)
      originImg.value.push({
        name: image,
        url: `${process.env.VUE_APP_BASE_URL}/post/images/${image}`
      });
  };
  queryPostDetails(Number(postId));
  editorMode.value = 'update';
}
</script>

<style lang="less" scoped>
.edit {
}
</style>

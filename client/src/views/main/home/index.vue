<template>
  <div class="home">
    <div v-show="homeTitle" class="home-title">{{ homeTitle }}</div>
    <div class="post-list">
      <template v-for="post in postList" :key="post.id">
        <post-overview @click="handlePostDetailsClick(post.id)" v-bind="post" />
      </template>
      <div class="footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-size="queryInfo.pageSize"
          v-model:currentPage="queryInfo.pageNum"
          :total="postCount"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';

import PostOverview from '@/components/post-overview';
import Caed from '@/components/card';

const queryInfo = ref({
  moduleName: 'post',
  pageSize: 10,
  pageNum: 1
});

const store = useStore();
const getPostList = () => {
  store.dispatch('getPageListAction', queryInfo.value);
};
getPostList();
watch(
  () => queryInfo.value,
  () => getPostList(),
  { deep: true }
);

const postList = computed(() => store.state.postList);
const postCount = computed(() => store.state.postCount);

const router = useRouter();
const handlePostDetailsClick = (postId: number) => {
  router.push({ path: '/main/details', query: { postId } });
};

const homeTitle = ref('');

const targetKeyword = computed(() => store.state.keyword);
const targetLabel = computed(() => store.state.label);
watch([targetKeyword, targetLabel], ([newKeyword, newLabel]) => {
  if (newKeyword !== null) {
    store.dispatch('getPageListAction', { ...queryInfo.value, title: newKeyword });
    homeTitle.value = `关键字 ${newKeyword} 查询结果`;
    if (!newKeyword) homeTitle.value = '';
  }
  if (newLabel !== null) {
    store.dispatch('getPageListAction', { ...queryInfo.value, labels: [newLabel.id] });
    homeTitle.value = `标签 ${newLabel.name} 下的文章`;
  }
});
</script>

<style lang="less" scoped>
.home {
  .home-title {
    background-color: rgba(255, 255, 255, 0.3);
    line-height: 36px;
    border-radius: 4px;
    overflow: hidden;
    padding: 0 12px;
  }
  .post-list {
    .footer {
      padding-top: 12px;
      text-align: center;
    }
  }
}
</style>

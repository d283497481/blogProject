<template>
  <div class="archive">
    <div class="custom-title">
      <div class="text">文章归档</div>
      <div class="sub-title">共有{{ postCount }}篇文章，请加大力度~</div>
    </div>
    <el-timeline>
      <template v-for="post in postList" :key="post.id">
        <el-timeline-item
          type="primary"
          hollow
          :timestamp="$filters.formatTime(post.updateAt)"
          placement="top"
        >
          <div class="post" @click="handlePostTitleClick(post.id)">
            {{ post.title }}
            <div class="border"></div>
          </div>
        </el-timeline-item>
      </template>
    </el-timeline>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

const store = useStore();
store.dispatch('getPageListAction', { moduleName: 'post', pageNum: 1, pageSize: 1000 });
const postList = computed(() => store.state.postList);
const postCount = computed(() => store.state.postCount);

const router = useRouter();
const handlePostTitleClick = (postId: number) => {
  router.push({ path: '/main/details', query: { postId } });
};
</script>

<style lang="less">
.archive {
  .el-timeline {
    padding: 0;
  }
  .el-timeline-item__timestamp {
    color: #fff;
    font-size: 16px;
  }
  .post {
    color: #fff;
    font-size: 18px;
    display: inline-block;
    line-height: 32px;
    position: relative;
    cursor: pointer;
    .border {
      position: absolute;
      width: 0;
      height: 1px;
      background-color: #fff;
      transition: all 0.4s;
    }
    &:hover {
      color: #bbb;
      .border {
        width: 100%;
      }
    }
  }
}
</style>

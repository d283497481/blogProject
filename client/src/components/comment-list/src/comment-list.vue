<template>
  <div class="comment-list">
    <template v-for="comm in commentList" :key="comm.id">
      <comment-info
        :postId="postId"
        :comment="comm"
        @replyCommentSuccess="handleReplyCommentSuccess"
      >
        <template #default="{ row }">
          <comment-info
            v-for="reply in row"
            :key="reply.id"
            :postId="postId"
            :comment="reply"
            @replyCommentSuccess="handleReplyCommentSuccess"
          >
          </comment-info>
        </template>
      </comment-info>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps, computed, defineExpose } from 'vue';
import { useStore } from '@/store';

import CommentInfo from '@/components/comment-info';

const props = withDefaults(
  defineProps<{
    postId: number;
  }>(),
  {}
);

const queryInfo = ref({
  moduleName: 'comment',
  pageNum: 1,
  pageSize: 100
});

const store = useStore();

const getCommentList = () => {
  store.dispatch('getPageListAction', { postId: props.postId, ...queryInfo.value });
};
getCommentList();

const commentList = computed(() => store.state.commentList);
const commentCount = computed(() => store.state.commentCount);

const handleReplyCommentSuccess = () => {
  getCommentList();
};

defineExpose({
  getCommentList
});
</script>

<style lang="less" scoped>
.comment-list {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>

<template>
  <div class="post-details">
    <post-info v-bind="postDetails" />
    <post-reply @replySuccess="handleReplySuccess" :rows="3" :postId="postId" mode="comment" />
    <comment-list ref="commentListRef" :postId="postId" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import { IPostDetails } from '@/service/types';
import { getPostDetails } from '@/service/api';

import PostInfo from '@/components/post-info';
import PostReply from '@/components/post-reply';
import CommentList from '@/components/comment-list';

const route = useRoute();
const postId = Number(route.query?.postId);

const postDetails = ref<IPostDetails>();
const getPostDetailsHandler = async (postId: number) => {
  if (postId !== 0 && !postId) return '';
  const { data } = await getPostDetails(postId);
  postDetails.value = data;
};
getPostDetailsHandler(postId);

const commentListRef = ref<InstanceType<typeof CommentList>>();

const handleReplySuccess = () => {
  commentListRef.value.getCommentList();
};
</script>

<style lang="less" scoped>
.post-details {
  height: 100%;
}
</style>

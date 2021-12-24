<template>
  <div class="comment-info">
    <div class="user-avatar">
      <el-avatar size="medium" :src="comment.user.avatarUrl ?? defaultAvatar"></el-avatar>
    </div>
    <div class="comment-box">
      <div class="comment-top">
        <div class="top-item">
          <svg-icon name="user" :size="16" color="#fff"></svg-icon>
          <span class="value"
            >{{ comment?.user.nickname ?? comment?.user.name
            }}{{
              comment?.parent
                ? ` 回复 ${comment?.parent?.user.nickname ?? comment?.parent?.user.name}`
                : ''
            }}</span
          >
        </div>
        <div class="top-item">
          <svg-icon name="time" :size="16" color="#fff"></svg-icon>
          <span class="value">{{ $filters.formatTime(comment?.createAt) }}</span>
        </div>
        <div class="top-item btn" @click="showReplyBox = !showReplyBox">
          <svg-icon name="comment" :size="16" :color="showReplyBox ? '#409EFF' : '#fff'"></svg-icon>
          <span :class="['value', showReplyBox ? 'selected' : '']">{{
            showReplyBox ? '取消回复' : '回复'
          }}</span>
        </div>
      </div>
      <div class="content" v-html="contentToHtml(comment.content)"></div>
      <div
        class="content reply-content"
        v-if="comment?.parent"
        v-html="contentToHtml(comment?.parent.content)"
      ></div>
      <post-reply
        v-if="showReplyBox"
        mode="reply"
        @replySuccess="handleReplySuccess"
        :postId="postId"
        :commentId="comment.id"
        :placeholder="`回复${comment?.user.nickname ?? comment?.user.name}`"
      />
      <slot :row="replyArr"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps, defineEmits, watch } from 'vue';
import { ICommentReply } from '../types';
import { ICommentInfo } from '@/service/types';

import PostReply from '@/components/post-reply';

import defaultAvatar from '@/assets/image/defaultAvatar.png';

const props = withDefaults(
  defineProps<{
    postId: number;
    comment: ICommentReply;
  }>(),
  {}
);
const emit = defineEmits(['replyCommentSuccess']);

const showReplyBox = ref(false);

// 转换表情
const contentToHtml = (content: string) => {
  const reg = /::emoji-[0-9]{1,2}::/g;
  if (reg.test(content)) {
    const arr = content.match(reg);
    arr?.forEach((item) => {
      content = content.replace(item, `<span class="emoji ${item.replaceAll(':', '')}"></span>`);
    });
    arr?.map((item) => item.replaceAll(':', ''));
    return content;
  }
  return `<span>${content}</span>`;
};

const handleReplySuccess = () => {
  emit('replyCommentSuccess');
  showReplyBox.value = false;
};

const replyArr = ref<ICommentReply[]>();
watch(
  () => props.comment,
  (newVal) => {
    // 将多层级嵌套的评论数据转换为二级数据
    const tempArr: ICommentReply[] = [];
    const flatteningAnArray = (target: ICommentInfo[]) => {
      for (const reply of target) {
        tempArr.push(reply);
        flatteningAnArray(reply.children ?? []);
      }
    };
    flatteningAnArray(newVal.children ?? []);

    for (const reply of tempArr) {
      const parent = tempArr.find((item: any) => item.id === reply.commentId);
      reply.parent = parent;
      delete reply.children;
    }
    replyArr.value = tempArr;
  },
  { immediate: true }
);
</script>

<style lang="less" scoped>
.comment-info {
  padding: 12px;
  display: flex;
  .user-avatar {
    padding-right: 10px;
  }
  .comment-box {
    flex: 1;
    .comment-top {
      display: flex;
      flex-flow: row wrap;
      .btn {
        cursor: pointer;
      }
      .svg-icon {
        vertical-align: middle;
      }
      .value {
        margin-right: 10px;
        margin-left: 6px;
        font-size: 14px;
        &.selected {
          color: #409eff;
        }
      }
    }
    .content {
      line-height: 32px;
      height: 32px;
      box-sizing: border-box;
      padding: 0 12px;
    }
    .reply-content {
      background-color: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>

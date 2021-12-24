<template>
  <div class="post-reply">
    <div class="user-avatar">
      <el-avatar size="medium" :src="avatarUrl"></el-avatar>
    </div>
    <div class="reply-box">
      <el-input
        ref="replyInputRef"
        v-model="content"
        type="textarea"
        :placeholder="placeholder"
        :rows="rows"
        @click="checkLogin"
      >
      </el-input>
      <div class="reply-sub">
        <div class="sub-left">
          <el-popover placement="right" :hide-after="0" :width="380" trigger="click">
            <template #reference>
              <div><svg-icon name="biaoqing" color="#fff" :size="18"></svg-icon>表情</div>
            </template>
            <div class="emoji-list">
              <template v-for="i in 52" :key="i">
                <div
                  @click="handleSelectEmoji(i)"
                  :class="['emoji-item', 'emoji', `emoji-${i}`]"
                ></div>
              </template>
            </div>
          </el-popover>
        </div>
        <div class="sub-right">
          <el-button
            :disabled="content.length < 1"
            type="primary"
            size="small"
            @click="submitComment"
            >发表评论</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps, computed, defineEmits } from 'vue';
import { ReplyModeType } from '../types';
import { useStore } from '@/store';
import { ElMessage, ElInput } from 'element-plus';
import { comment, reply } from '@/service/api';

const props = withDefaults(
  defineProps<{
    mode: ReplyModeType;
    rows?: number;
    placeholder?: string;
    postId: number;
    commentId?: number;
  }>(),
  {
    rows: 1,
    placeholder: '输入评论'
  }
);

const emit = defineEmits(['replySuccess']);

const store = useStore();
const content = ref('');
const replyInputRef = ref<InstanceType<typeof ElInput>>();
const avatarUrl = computed(() => store.state.userInfo?.avatar_url);

const handleSelectEmoji = (index: number) => {
  content.value += `::emoji-${index}::`;
};

const checkLogin = () => {
  if (!store.state.userInfo?.name) {
    ElMessage.info('请先登录，再评论~');
    store.commit('changeShowLoginBox', true);
    replyInputRef.value?.blur();
  }
};

const submitComment = () => {
  if (props.mode === 'comment') {
    comment({ postId: props.postId, content: content.value }).then((res) => {
      ElMessage.success(res.message);
      content.value = '';
      emit('replySuccess');
    });
  } else if (props.mode === 'reply') {
    reply(props.commentId!, { postId: props.postId, content: content.value }).then((res) => {
      ElMessage.success(res.message);
      content.value = '';
      emit('replySuccess');
    });
  }
};
</script>

<style lang="less">
.post-reply {
  display: flex;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 12px;
  margin-bottom: 12px;
  .user-avatar {
    padding-right: 10px;
  }
  .reply-box {
    flex: 1;
  }
  .reply-sub {
    line-height: 48px;
    display: flex;
    justify-content: space-between;
    .sub-left {
      font-size: 13px;
      cursor: pointer;
      .svg-icon {
        vertical-align: sub;
        margin-right: 3px;
      }
      &:hover {
        color: #409eff;
      }
    }
  }
}
</style>

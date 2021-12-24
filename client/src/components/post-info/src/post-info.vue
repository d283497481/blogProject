<template>
  <div class="post-info">
    <div class="custom-title post-title">
      <div class="text">{{ post?.title }}</div>
      <div class="sub-text">
        <div class="sub-item">
          <svg-icon name="user" :size="16" color="#fff"></svg-icon>
          <span class="value">{{ post?.user.nickname ?? post?.user.name }}</span>
        </div>
        <div class="sub-item">
          <svg-icon name="time" :size="16" color="#fff"></svg-icon>
          <span class="value">{{ $filters.formatTime(post?.updateAt) }}</span>
        </div>
        <div class="sub-item">
          <svg-icon name="comment" :size="16" color="#fff"></svg-icon>
          <span class="value">{{ commentCount && commentCount }} 评论</span>
        </div>
        <div class="sub-item">
          #
          <span class="value">{{ labels && labels.map((item) => item.name).join(' | ') }}</span>
        </div>
      </div>
    </div>
    <div class="details" v-html="compiledMarkdown"></div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, ref, watch } from 'vue';

import { ILabel, IPost } from '@/service/types';

import marked from 'marked';
import hljs from 'highlight.js';
import 'highlight.js/styles/agate.css';

const props = withDefaults(
  defineProps<{
    post?: IPost;
    labels?: ILabel[];
    commentCount?: number;
  }>(),
  {}
);

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code: any, language: any) {
    const validLanguage = hljs.getLanguage(language) ? language : 'plaintext';
    if (language && hljs.getLanguage(language)) {
      return '<div class="hljs">' + hljs.highlight(validLanguage, code).value + '</div>';
    }
    return hljs.highlightAuto(code).value;
  },
  gfm: true, //默认为true。 允许 Git Hub标准的markdown.
  tables: true, //默认为true。 允许支持表格语法。该选项要求 gfm 为true。
  breaks: true, //默认为false。 允许回车换行。该选项要求 gfm 为true。
  pedantic: false, //默认为false。 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
  sanitize: false, //对输出进行过滤（清理）
  smartLists: true,
  smartypants: true, //使用更为时髦的标点，比如在引用语法中加入破折号。
  langPrefix: 'hljs language-',
  xhtml: true
});

const compiledMarkdown = ref();
watch(
  () => props.post?.content,
  (newVal) => {
    compiledMarkdown.value = marked(newVal);
  }
);
</script>

<style lang="less" scoped>
.post-info {
  padding: 12px;
  background-color: rgba(0, 0, 0, 0.8);
  margin-bottom: 12px;
  .post-title {
    .text {
      text-align: center;
    }
    .sub-text {
      display: flex;
      justify-content: center;
      .svg-icon {
        vertical-align: middle;
      }
      .sub-item {
        margin-right: 9px;
        .value {
          margin-left: 6px;
        }
      }
    }
  }
  .details {
    overflow: hidden;
  }
}
</style>

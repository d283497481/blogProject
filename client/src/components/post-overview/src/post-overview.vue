<template>
  <card class="post-overview">
    <div class="post-item">
      <img :src="postImg" alt="文章配图" />
      <div class="mask">
        <div class="label">
          <svg-icon name="tag" :size="22" color="#fff"></svg-icon>
          <el-tag v-for="label in labels" :key="label.id" class="custom-tag" size="mini">{{
            label.name
          }}</el-tag>
        </div>
        <h2 class="title">{{ title }}</h2>
        <div class="footer">
          <p class="abstract">
            {{ abstract }}
          </p>
          <el-divider></el-divider>
          <div class="footer-bootom">
            <div class="footer-item">
              <svg-icon name="user" :size="16" color="#fff"></svg-icon>
              <span class="value">{{ user.nickname ?? user.name }}</span>
            </div>
            <div class="footer-item">
              <svg-icon name="time" :size="16" color="#fff"></svg-icon>
              <span class="value">{{ $filters.formatTime(updateAt) }}</span>
            </div>
            <div class="footer-item">
              <svg-icon name="comment" :size="16" color="#fff"></svg-icon>
              <span class="value">{{ commentCount }} 评论</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </card>
</template>

<script lang="ts" setup>
import { ref, withDefaults, defineProps } from 'vue';
import { IUser, ILabel } from '@/service/types';

import Card from '@/components/card';
import defaultImg from '@/assets/image/39.jpg';

const props = withDefaults(
  defineProps<{
    title: string;
    abstract?: string;
    image?: string;
    labels?: ILabel[];
    commentCount: number;
    updateAt: string;
    user: IUser;
  }>(),
  {
    labels: () => [],
    abstract: ''
  }
);

const postImg = ref(
  props.image ? `${process.env.VUE_APP_BASE_URL}/post/images/${props.image}` : defaultImg
);
</script>

<style lang="less" scoped>
.post-overview {
  margin-bottom: 12px;
}
.post-item {
  position: relative;
  cursor: pointer;
  img {
    width: 100%;
    max-height: 300px;
  }
  .mask {
    width: 100%;
    height: 100%;
    position: absolute;
    padding: 12px;
    box-sizing: border-box;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.35);
    .label {
      position: absolute;
      top: 15%;
      opacity: 0;
      transition: all 0.2s;
      .custom-tag {
        background-color: rgba(255, 255, 255, 0.3);
        margin-left: 3px;
      }
    }
    .title {
      width: 100%;
      text-align: center;
      font-size: 25px;
      font-weight: 400;
      margin: 0;
      position: absolute;
      top: 50%;
      margin-top: -13px;
      transition: all 0.2s;
    }
    .svg-icon {
      vertical-align: middle;
    }
    .footer {
      position: absolute;
      bottom: 18%;
      width: 100%;
      transition: all 0.3s;
      opacity: 0;
      left: 0;
      padding: 0 12px;
      .abstract {
        font-size: 14px;
        margin: 0;
      }
      .el-divider {
        margin: 20px 0;
      }
      .footer-bootom {
        display: flex;
        .footer-item + .footer-item {
          margin-left: 12px;
        }
        .value {
          margin-left: 6px;
          font-size: 14px;
        }
      }
    }
  }
  &:hover {
    img {
      filter: blur(4px);
    }
    .mask {
      .label {
        opacity: 1;
        top: 5%;
      }
      .title {
        top: 30%;
      }
      .footer {
        transform: translateY(0);
        opacity: 1;
        bottom: 8%;
      }
    }
  }
}
</style>

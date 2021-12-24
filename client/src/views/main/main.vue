<template>
  <el-row class="main" id="main">
    <el-col v-bind="layoutConfig">
      <el-container class="container">
        <el-header>
          <el-row>
            <el-col v-bind="layoutConfig">
              <nav-menu />
            </el-col>
          </el-row>
        </el-header>
        <el-container class="container-2">
          <el-container>
            <el-main class="no-padding">
              <router-view></router-view>
            </el-main>
          </el-container>
          <el-aside class="hidden-xs" width="350px">
            <main-aside />
          </el-aside>
        </el-container>
      </el-container>
    </el-col>
    <login-modal />
    <div class="go-top" title="返回顶部" v-show="showGoTop">
      <a href="#main">
        <img :src="goTopImg" alt="go-top" width="50" height="50" />
      </a>
    </div>
  </el-row>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import NavMenu from '@/components/nav-menu';
import MainAside from '@/components/main-aside';
import LoginModal from '@/components/login-modal';

import { layoutConfig } from './config/layout.config';

import goTopImg from '@/assets/image/goTop.png';

const showGoTop = ref(false);

window.addEventListener('scroll', () => {
  if (window.scrollY > window.outerHeight) {
    showGoTop.value = true;
  } else {
    showGoTop.value = false;
  }
});
</script>

<style lang="less" scoped>
.main {
  min-height: 100%;
  background: url('~@/assets/image/bg-01.jpg') no-repeat fixed center top;
  background-size: cover;
  overflow: auto;
  color: #fff;
  .go-top {
    position: fixed;
    z-index: 999;
    bottom: 8%;
    right: 3%;
    cursor: pointer;
    &:hover {
      img {
        filter: brightness(80%);
      }
    }
  }
  .container {
    height: 100%;
    position: relative;
    width: 100%;
    .el-header {
      width: 100%;
      padding: 0;
      position: fixed;
      background-color: #000;
      z-index: 888;
      left: 0;
    }
    .container-2 {
      padding-top: 88px !important;
    }
    .el-aside {
      position: relative;
    }
    .el-main {
      padding: 12px 32px 12px 12px;
      min-height: 100%;
      overflow: hidden;
    }
  }
}
</style>

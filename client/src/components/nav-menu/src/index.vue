<template>
  <div class="nav">
    <div class="logo"></div>
    <nav-menu class="menu" />
    <div class="search">
      <nav-search />
    </div>
    <user-info />
  </div>
</template>

<script lang="ts" setup>
import NavMenu from './nav-menu.vue';
import NavSearch from './nav-search.vue';
import UserInfo from './user-info.vue';
</script>

<style lang="less" scoped>
.nav {
  height: 100%;
  display: flex;
  .logo {
    width: 50px;
    height: 100%;
    background: url('~@/assets/logo.png') no-repeat center 16px;
    background-size: 40px auto;
    cursor: pointer;
  }
  .menu {
    flex: 1;
  }
  .search {
    max-width: 250px;
    display: flex;
    align-items: center;
    margin-right: 8px;
  }
  .user {
    width: 150px;
  }
}
</style>

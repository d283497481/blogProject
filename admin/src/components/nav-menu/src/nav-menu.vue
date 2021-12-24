<template>
  <div class="nav-menu">
    <!-- <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-show="!isFold" class="title">Vue3+TS</span>
    </div> -->
    <el-menu
      :default-active="activePath"
      class="el-menu-vertical"
      background-color="#001529"
      text-color="#fff"
      :collapse="isFold"
    >
      <template v-for="item in userMenu" :key="item.id">
        <!-- 二级菜单 -->
        <template v-if="item.level === 1">
          <el-sub-menu :index="item.url">
            <template #title>
              <i v-if="item.icon" :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.url" @click="handleMenuItemClick(subitem.url)">
                <i v-if="subitem.icon" :class="subitem.icon"></i>
                <span>{{ subitem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- 一级菜单 -->
        <template v-else-if="item.level === 2">
          <el-menu-item :index="item.url" @click="handleMenuItemClick(item.url)">
            <i v-if="item.icon" :class="item.icon"></i>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, defineProps, withDefaults } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from '@/store';

const props = withDefaults(
  defineProps<{
    isFold: boolean;
  }>(),
  {
    isFold: false
  }
);

const store = useStore();
const userMenu = computed(() => store.state.login.userMenu);

const router = useRouter();
const handleMenuItemClick = (path: string) => {
  router.push(path);
};

const route = useRoute();
const activePath = computed(() => route.path);
</script>

<style lang="less" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-sub-menu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-sub-menu__title {
    background-color: #001529 !important;
  }

  .el-sub-menu__title:hover {
    background-color: #052038;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
    background-color: #2c3e4d !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  // height: calc(100% - 48px);
}
</style>

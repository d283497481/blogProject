<template>
  <el-menu
    background-color="#000"
    text-color="#FFF"
    :default-active="activePath"
    class="el-menu-demo"
    mode="horizontal"
    router
  >
    <template v-for="route in routes" :key="route.path">
      <el-menu-item :index="route.path">
        <div class="name">{{ route.meta.title }}</div>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const routes = router.getRoutes().filter((route) => route.meta.isShow);
const activePath = computed(() => router.currentRoute.value.path);
</script>

<style lang="less" scoped>
.el-menu {
  background: rgba(0, 0, 0, 0);
  border: none;
  .el-menu-item {
    font-size: 18px;
    margin-left: 15px;
    padding: 0;
    box-sizing: content-box;
    .name {
      padding: 0 8px;
      box-sizing: border-box;
      user-select: none;
      &::before,
      &::after {
        content: '';
        position: absolute;
        height: 2px;
        background-color: #ccc;
        width: 100%;
        bottom: 0;
        left: 0;
        transition: all 0.5s;
      }
    }
    &:hover {
      .name {
        &::before {
          bottom: 50px;
          transform: scale(1.1);
        }
        &::after {
          height: 3px;
          transform: scale(1.1);
        }
      }
    }
    &.is-active {
      border: none;
      .name {
        &::before,
        &::after {
          background-color: #409eff;
        }
      }
    }
  }
}
</style>

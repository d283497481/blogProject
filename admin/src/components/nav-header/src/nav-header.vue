<template>
  <div class="nav-header">
    <i
      @click="handleFoldClick"
      :class="['fold-menu', isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
      :title="isFold ? '展开菜单' : '折叠菜单'"
    ></i>
    <div class="content">
      <breadcrumb class="breadcrumb" :breadcrumbs="breadcrumbs" />
      <user-info class="user-info" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, defineEmits, computed } from 'vue';
import { useStore } from '@/store';
import { useRoute } from 'vue-router';
import Breadcrumb from '@/base-ui/breadcrumb';
import UserInfo from './user-info.vue';
import { pathMapBreadcrumbs } from '@/utils/map-menus';

const props = withDefaults(
  defineProps<{
    isFold: boolean;
  }>(),
  {
    isFold: false
  }
);
const emit = defineEmits(['foldChange']);

const handleFoldClick = () => {
  emit('foldChange', !props.isFold);
};

const store = useStore();
const route = useRoute();
const breadcrumbs = computed(() => {
  const userMenu = computed(() => store.state.login.userMenu);
  const currentPath = route.path;
  return pathMapBreadcrumbs(userMenu.value, currentPath);
});
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  position: relative;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .breadcrumb {
    margin-left: 12px;
  }
}
</style>

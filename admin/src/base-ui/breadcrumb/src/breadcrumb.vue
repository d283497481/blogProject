<template>
  <el-breadcrumb separator="/">
    <template v-for="item in breadcrumbs" :key="item.name">
      <el-breadcrumb-item :to="{ path: item.path ?? '' }">{{ item.name }}</el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, PropType } from 'vue';
import { IBreadcrumb } from './types';

const props = withDefaults(
  defineProps<{
    breadcrumbs: IBreadcrumb[];
  }>(),
  {
    breadcrumbs: () => []
  }
);
</script>

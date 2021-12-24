<template>
  <el-card class="box-card custom-card">
    <template v-if="title" #header>
      <div class="card-header">
        <div class="space"></div>
        {{ title }}
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue';
const props = withDefaults(
  defineProps<{
    title?: string;
  }>(),
  {
    title: ''
  }
);
</script>

<style lang="less">
.custom-card {
  background-color: rgba(0, 0, 0, 0.2) !important;
  border: none;
  color: #fff;
  padding: 0;
  .el-card__header {
    padding: 8px 0 0 0;
    border: none;
    position: relative;
    line-height: 30px;
    padding-left: 25px;
    .space {
      width: 3px;
      height: 22px;
      background-color: red;
      position: absolute;
      left: 12px;
      top: 12px;
    }
  }
  .el-card__body {
    padding: 8px 0 0 0;
  }
}
</style>

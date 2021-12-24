<template>
  <div class="item-box">
    <div class="label" :style="{ width: labelWidth }">{{ label }}</div>
    <div class="content">
      <slot>内容</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps } from 'vue';

const props = withDefaults(
  defineProps<{
    labelWidth?: string;
    label?: string;
  }>(),
  {
    labelWidth: '100px',
    label: ''
  }
);
</script>

<style lang="less" scoped>
.item-box {
  display: flex;
  padding: 8px 12px;
  .label {
    text-align: right;
    padding-right: 12px;
    font-size: 14px;
    line-height: 29px;
    box-sizing: border-box;
  }
  .content {
    flex: 1;
  }
}
</style>

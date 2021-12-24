<template>
  <el-input
    v-model="keyword"
    @keydown.enter="handleQueryPost"
    size="small"
    placeholder="输入关键词搜索"
  >
    <template #suffix>
      <i class="el-icon-search el-input__icon"> </i>
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '@/store';

const store = useStore();
const keyword = ref('');

const handleQueryPost = () => {
  store.commit('changeKeyword', keyword.value);
  store.commit('changeLabel', null);
};
</script>

<style lang="less" scoped></style>

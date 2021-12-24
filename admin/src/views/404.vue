<template>
  <div>
    <el-result icon="error" title="404" subTitle="当前访问路径不存在">
      <template #extra>
        <el-button type="primary" size="medium" @click="$router.go(-1)">返回</el-button>
      </template>
    </el-result>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    return {};
  }
});
</script>

<template>
  <div class="main-aside">
    <card title="标签">
      <div class="tag-list">
        <el-tag
          class="custom-tag"
          v-for="label in labelList"
          :key="label.id"
          size="medium"
          @click="handleLabelClick(label)"
          >{{ label.name }}</el-tag
        >
      </div>
    </card>
    <card title="博主信息">
      <div class="info-box">
        <div class="info"><svg-icon name="nicheng" :size="30" /><span>昵称: 落叶</span></div>
        <el-divider></el-divider>
        <div class="info"><svg-icon name="xingbie" :size="30" /><span>性别: 男</span></div>
        <el-divider></el-divider>
        <div class="info"><svg-icon name="dizhi" :size="30" /><span>地址: 武汉</span></div>
        <el-divider></el-divider>
        <div class="info"><svg-icon name="zhiye" :size="30" /><span>职业: 前端工程师</span></div>
        <el-divider></el-divider>
        <div class="info"><svg-icon name="QQ" :size="30" /><span>QQ: 1015185292</span></div>
        <el-divider></el-divider>
        <div class="info"><svg-icon name="weixin" :size="30" /><span>微信: zhang_Pei96</span></div>
        <el-divider></el-divider>
        <div class="info">
          <svg-icon name="qianming" :size="30" /><span>签名: 路漫漫其修远兮,吾将上下而求索</span>
        </div>
      </div>
    </card>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import Card from '@/components/card';

const store = useStore();
store.dispatch('getPageListAction', { moduleName: 'label', pageNum: 1, pageSize: 1000 });
const labelList = computed(() => store.state.labelList);

const handleLabelClick = (label: any) => {
  console.log(label);
  store.commit('changeKeyword', null);
  store.commit('changeLabel', label);
};
</script>

<style lang="less" scoped>
.main-aside {
  position: fixed;
  width: 350px;
  .tag-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-evenly;
    padding: 0 12px;
    .el-tag {
      margin-bottom: 6px;
    }
  }
  .info-box {
    padding: 0 12px;
    .info {
      line-height: 40px;
      font-size: 14px;
      color: #fff;
      .svg-icon {
        vertical-align: middle;
        margin-right: 8px;
      }
    }
    .el-divider {
      margin: 0;
    }
  }
}
</style>

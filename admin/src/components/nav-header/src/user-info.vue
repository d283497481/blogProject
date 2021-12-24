<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar size="medium" :src="avatarUrl"></el-avatar>
      <span>
        {{ nickname ?? name }}
      </span>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        <el-dropdown-item divided @click="$router.push('/main/userInfo')"
          >个人信息</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import localCache from '@/utils/cache';

const store = useStore();
const name = computed(() => store.state.login.userInfo?.name);
const nickname = computed(() => store.state.login.userInfo?.nickname);
const avatarUrl = computed(() => store.state.login.userInfo?.avatar_url);

const router = useRouter();
const handleExitClick = () => {
  localCache.clearCache();
  router.push('/login');
};
</script>

<style lang="less" scoped>
.el-dropdown {
  .el-dropdown-link {
    cursor: pointer;
    display: flex;
    align-items: center;
    .el-avatar {
      margin-right: 8px;
    }
  }
}
</style>

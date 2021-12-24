<template>
  <div class="user-info">
    <el-dropdown v-if="name">
      <span class="el-dropdown-link">
        <el-avatar size="medium" :src="avatarUrl ?? defaultAvatar"></el-avatar>
        <span class="hidden-xs">
          {{ nickname ?? name }}
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item divided>个人信息</el-dropdown-item> -->
          <el-dropdown-item @click="handleExitClick">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <el-button v-else type="text" @click="handleLoginClick">登录</el-button>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useStore } from '@/store';
import defaultAvatar from '@/assets/image/defaultAvatar.png';

const store = useStore();
const name = computed(() => store.state.userInfo?.name);
const nickname = computed(() => store.state.userInfo?.nickname);
const avatarUrl = computed(() => store.state.userInfo?.avatar_url);

const handleLoginClick = () => {
  store.commit('changeShowLoginBox', true);
};

const handleExitClick = () => {
  store.dispatch('logoutAction');
};
</script>

<style lang="less" scoped>
.user-info {
  display: flex;
  align-items: center;
  .el-dropdown {
    .el-dropdown-link {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #fff;
      .el-avatar {
        margin-right: 8px;
      }
    }
  }
}
</style>

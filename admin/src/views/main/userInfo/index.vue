<template>
  <el-tabs type="border-card">
    <el-tab-pane label="个人信息">
      <div class="info-box">
        <div class="avatar">
          <el-avatar
            @mouseenter="imgMask = true"
            :size="135"
            :src="userInfo.avatar_url"
          ></el-avatar>
          <div class="mask" @mouseleave="imgMask = false" v-show="imgMask">
            <i @click="handleUpdateAvatar" class="el-icon-camera" title="修改头像"></i>
          </div>
        </div>
        <div class="info">
          <el-form :model="userForm" label-width="80px" size="mini">
            <el-form-item label="用户名" prop="password">
              <el-input v-model="userInfo.name" readonly></el-input>
            </el-form-item>
            <el-form-item label="昵称">
              <el-input v-model="userForm.nickname"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitUserForm">提交</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-tab-pane>
    <el-tab-pane label="修改密码">
      <el-form :model="passForm" label-width="80px" size="mini" style="max-width: 300px">
        <el-form-item label="密码" prop="password">
          <el-input v-model="passForm.oldPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input v-model="passForm.checkPassword" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input v-model="passForm.password" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPassForm">提交</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
  <image-cropping ref="ImageCroppingRef" @getNewImg="handleNewImage" />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { useStore } from '@/store';
import { useRouter } from 'vue-router';
import ImageCropping from '@/components/image-cropping';
import { uploadUserAvatar, editPageData, updateUserPassword } from '@/service/main/system/system';
import localCache from '@/utils/cache';
import { handlePassword } from '@/utils/handle-password';

const store = useStore();
const userInfo = computed(() => store.state.login.userInfo);
const imgMask = ref(false);
const ImageCroppingRef = ref<InstanceType<typeof ImageCropping>>();

const handleUpdateAvatar = () => {
  ImageCroppingRef.value.dialogVisible = true;
};

const handleNewImage = (file: File) => {
  if (file) {
    const formData = new FormData();
    formData.append('avatar', file);
    uploadUserAvatar(userInfo.value!.id, formData).then((res) => {
      ImageCroppingRef.value.dialogVisible = false;
      location.reload();
    });
  } else {
    ImageCroppingRef.value.dialogVisible = false;
  }
};

const userForm = ref({
  nickname: userInfo.value!.nickname
});

const passForm = ref({
  oldPassword: '',
  checkPassword: '',
  password: ''
});

const submitUserForm = () => {
  if (!/\S/.test(userForm.value.nickname)) {
    ElMessage.error('昵称不能为空~');
    return;
  }
  editPageData(`/user/${userInfo.value!.id}`, userForm.value).then((res) => {
    ElMessage.success('昵称修改成功，请重新登录~');
    localCache.clearCache();
    router.push('/login');
  });
};

const router = useRouter();
const submitPassForm = () => {
  if (!passForm.value.oldPassword || !passForm.value.password) {
    ElMessage.error('密码不能为空~');
    return;
  }
  if (passForm.value.oldPassword !== passForm.value.checkPassword) {
    ElMessage.error('密码与确认密码不一致~');
    return;
  }
  updateUserPassword(userInfo.value!.id, {
    oldPassword: handlePassword(passForm.value.oldPassword),
    checkPassword: handlePassword(passForm.value.checkPassword),
    password: handlePassword(passForm.value.password)
  }).then((res) => {
    ElMessage.success('密码修改成功，请重新登录~');
    localCache.clearCache();
    router.push('/login');
  });
};
</script>

<style lang="less" scoped>
.info-box {
  display: flex;
  align-self: center;
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    position: relative;
    cursor: pointer;
    .mask {
      width: 135px;
      height: 135px;
      border-radius: 50%;
      background-color: rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 32px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .info {
    display: flex;
    align-items: center;
  }
}
</style>

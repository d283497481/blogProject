<template>
  <el-dialog
    custom-class="login-modal"
    :title="dialogTitle"
    v-model="dialogVisible"
    width="30%"
    center
    @closed="handleLoginBoxClose"
  >
    <el-form :model="formData" status-icon :rules="rules" ref="formRef" label-width="65px">
      <el-form-item label="用户名" prop="name" :error="errorMsg">
        <el-input v-model="formData.name" autocomplete="off" autofocus></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :error="errorMsg" @keydown.enter="submitForm">
        <el-input v-model="formData.password" show-password autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <el-button v-if="dialogTitle === '登录'" type="text" @click="handleRegisterClick"
      >注册账号</el-button
    >
    <el-button v-if="dialogTitle === '注册'" type="text" @click="handleLoginCLick"
      >立即登录</el-button
    >
    <el-button type="primary" @click="submitForm" style="width: 100%; margin-left: 0">{{
      dialogTitle
    }}</el-button>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { ElForm, ElMessage } from 'element-plus';
import { register } from '@/service/api';
import { useStore } from '@/store';
import { handlePassword } from '@/utils';

const dialogVisible = ref(false);
const dialogTitle = ref<'登录' | '注册'>('登录');

const formRef = ref<InstanceType<typeof ElForm>>();
const formData = ref({
  name: '',
  password: ''
});
const errorMsg = ref('');
const rules = {
  name: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
    { pattern: /[\w]{5,15}/, message: '用户名只能是5-15位的字母、数字、下划线', trigger: 'change' }
  ],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
};

const resetForm = () => {
  formData.value.name = '';
  formData.value.password = '';
};

const handleRegisterClick = () => {
  dialogTitle.value = '注册';
  resetForm();
};
const handleLoginCLick = () => {
  dialogTitle.value = '登录';
  resetForm();
};

const store = useStore();

const handleLoginBoxClose = () => {
  store.commit('changeShowLoginBox', false);
  resetForm();
};
watch(
  () => store.state.showLoginBox,
  (newVal) => {
    if (newVal) dialogVisible.value = newVal;
  }
);
const submitForm = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      const payload = { ...formData.value, password: handlePassword(formData.value.password) };
      errorMsg.value = '';
      if (dialogTitle.value === '登录') {
        store
          .dispatch('loginAction', payload)
          .then((res) => {
            ElMessage.success(res.message);
            dialogVisible.value = false;
          })
          .catch((error) => {
            const {
              response: {
                data: { message }
              }
            } = error;
            errorMsg.value = message;
          });
      } else if (dialogTitle.value === '注册') {
        register(payload)
          .then((res) => {
            ElMessage.success(res.message);
          })
          .catch((error) => {
            const {
              response: {
                data: { message }
              }
            } = error;
            errorMsg.value = message;
          });
      }
    } else {
      return false;
    }
  });
};
</script>

<style lang="less">
.login-modal {
  min-width: 350px;
}
</style>

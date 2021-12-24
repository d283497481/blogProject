<template>
  <el-dialog v-model="dialogVisible" :destroy-on-close="true">
    <cropper ref="cropperRef" :file="file" />
    <br />
    <el-upload
      action="#"
      :auto-upload="false"
      multiple
      :limit="1"
      :on-exceed="handleExceed"
      :on-change="handleFileChange"
      :on-remove="handleFileRemove"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <template #tip>
        <div class="el-upload__tip">只能上传 jpg/png 文件</div>
      </template>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取消</el-button>
        <el-button size="small" type="primary" @click="handleConfirmCLick">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, defineExpose, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';
import Cropper from './cropper.vue';

const emit = defineEmits(['getNewImg']);

const dialogVisible = ref(false);
const file = ref();

const handleFileChange = (files: any, fileList: any[]) => {
  file.value = files.raw;
};
const handleExceed = (files: File, fileList: File[]) => {
  ElMessage.warning(`当前限制只能选择一个文件`);
};
const handleFileRemove = (files: any, fileList: any[]) => {
  file.value = null;
};

const cropperRef = ref<InstanceType<typeof Cropper>>();
const handleConfirmCLick = () => {
  cropperRef.value.createNewFile((file: File) => {
    if (!file) ElMessage.info(`未选择文件~`);
    emit('getNewImg', file ?? null);
  });
};

defineExpose({
  dialogVisible
});
</script>

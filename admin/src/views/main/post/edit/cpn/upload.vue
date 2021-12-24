<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :limit="1"
    :on-change="handleFileCHange"
    :on-exceed="handleExceed"
    :file-list="originImg"
  >
    <template #default>
      <i class="el-icon-plus"></i>
    </template>
    <template #file="{ file }">
      <div class="preview">
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-delete" @click="handleRemoveFile(file)">
            <i class="el-icon-delete"></i>
          </span>
        </span>
      </div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { ref, defineExpose, withDefaults, defineProps, defineEmits } from 'vue';
import { ElMessage } from 'element-plus';

const props = withDefaults(
  defineProps<{
    originImg: any[];
  }>(),
  {
    originImg: () => []
  }
);
const emit = defineEmits(['deleteOriginImg', 'fileChange']);

const imgList = ref<any>([]);
const handleFileCHange = (file: any, fileList: any[]) => {
  imgList.value = fileList;
  emit('fileChange', file);
};
const handleRemoveFile = (file: any) => {
  if (props.originImg.length) {
    emit('deleteOriginImg');
  } else {
    const index = imgList.value.findIndex((item: any) => item.uuid === file.uuid);
    imgList.value.splice(index, 1);
    emit('deleteOriginImg', true);
  }
};
const handleExceed = () => {
  ElMessage.warning('只允许使用一张配图~');
};

defineExpose({
  imgList
});
</script>

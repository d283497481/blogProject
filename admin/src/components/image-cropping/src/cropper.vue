<template>
  <div class="cropper-container">
    <div class="img-box">
      <img ref="imageEl" class="cropper-image" alt="404" />
    </div>
    <div class="control-container">
      <div ref="previewEl" class="preview-box"></div>
      <div class="control">
        <el-button type="primary" @click="onZoomSub" size="small" icon="el-icon-remove-outline"
          >缩小</el-button
        >
        <el-button type="primary" @click="onZoomAdd" size="small" icon="el-icon-circle-plus-outline"
          >放大</el-button
        >
        <el-button type="primary" @click="onRotateSub" size="small" icon="el-icon-refresh-left"
          >左转</el-button
        >
        <el-button type="primary" @click="onRotateAdd" size="small" icon="el-icon-refresh-right"
          >右转</el-button
        >
        <el-button type="primary" @click="onMove(0, -moveStep)" size="small" icon="el-icon-top"
          >上移</el-button
        >
        <el-button type="primary" @click="onMove(moveStep, 0)" size="small" icon="el-icon-right"
          >右移</el-button
        >
        <el-button type="primary" @click="onMove(0, moveStep)" size="small" icon="el-icon-bottom"
          >下移</el-button
        >
        <el-button type="primary" @click="onMove(-moveStep, 0)" size="small" icon="el-icon-back"
          >左移</el-button
        >
        <el-button type="primary" @click="onScaleX" size="small">左右翻转</el-button>
        <el-button type="primary" @click="onScaleY" size="small">上下翻转</el-button>
      </div>
      <el-button class="reset-button" type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted, defineProps, withDefaults, defineExpose } from 'vue';
import Cropper from 'cropperjs';
import 'cropperjs/dist/cropper.min.css';
import { fileToDataURI } from '@/utils/image';

const props = withDefaults(
  defineProps<{
    file: File;
    moveStep?: number;
  }>(),
  {
    moveStep: 4
  }
);

const imageEl = ref<HTMLImageElement>();
const previewEl = ref<HTMLDivElement>();
const instance = ref<Cropper>();

onMounted(() => {
  watch(
    () => props.file,
    (newVal) => {
      if (newVal) {
        instance.value = new Cropper(imageEl.value!, {
          preview: previewEl.value,
          checkCrossOrigin: false
        });
        fileToDataURI(props.file).then((dataURI) => {
          instance.value?.replace(dataURI);
        });
      } else {
        instance.value?.destroy();
      }
    }
  );
});

const onZoomSub = () => {
  instance.value?.zoom(-0.1);
};
const onZoomAdd = () => {
  instance.value?.zoom(0.1);
};
const onRotateSub = () => {
  instance.value?.rotate(-45);
};
const onRotateAdd = () => {
  instance.value?.rotate(45);
};
const onReset = () => {
  instance.value?.reset();
};
const onMove = (...rest: [number, number]) => {
  instance.value?.move(...rest);
};
const onScaleX = () => {
  instance.value?.scaleX(-instance.value?.getData().scaleX);
};
const onScaleY = () => {
  instance.value?.scaleY(-instance.value?.getData().scaleY);
};

// 创建新的文件
const createNewFile = (callback: (file?: File) => void) => {
  if (props.file) {
    instance.value?.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        const { name, type } = props.file;
        const file = new File([blob], name, { type });
        callback(file);
      } else {
        callback();
      }
    });
  } else {
    callback();
  }
};

defineExpose({
  createNewFile
});
</script>

<style lang="less" scoped>
.bg {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
}
.img-box {
  display: inline-block;
  height: 340px;
  width: 430px;
  border: 1px solid #ebebeb;
  .bg;
  img {
    max-width: 100%;
    display: block;
  }
}
.control-container {
  display: inline-block;
  width: 350px;
  padding: 0 10px;
  vertical-align: top;
  box-sizing: border-box;
}
.preview-box {
  height: 150px !important;
  width: 150px !important;
  overflow: hidden;
  border: 1px solid #ebebeb;
  .bg;
}
.control {
  height: 120px;
  margin: 12px 0;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-items: flex-end;
  .el-button {
    margin: 0;
  }
}
.reset-button {
  width: 100%;
}
</style>

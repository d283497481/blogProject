import { ref, Ref } from 'vue';
import { IOriginImage, IOthterInfo } from '../types';

export function useUploadImg(info: Ref<IOthterInfo>) {
  const originImg = ref<IOriginImage[]>([]);
  const deleteOringinImgHandler = (reset?: boolean) => {
    originImg.value.splice(0, 1);
    if (reset) info.value.image = null;
  };
  const handleFileChange = (file: any) => {
    info.value.image = file;
  };

  return { originImg, deleteOringinImgHandler, handleFileChange };
}

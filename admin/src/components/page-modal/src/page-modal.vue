<template>
  <div class="page-modal">
    <el-dialog
      v-model="dialogVisible"
      :title="modalConfig.title"
      width="30%"
      center
      :destroy-on-close="true"
    >
      <custom-form v-model="formData" v-bind="modalConfig"></custom-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取消</el-button>
          <el-button size="small" type="primary" @click="handleConfirmCLick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineProps, withDefaults, defineExpose } from 'vue';
import { useStore } from '@/store';
import CustomForm from '@/base-ui/form';

const props = withDefaults(
  defineProps<{
    modalConfig: any;
    defaultInfo?: any;
    otherInfo?: any;
    pageName: string;
  }>(),
  {
    defaultInfo: () => ({}),
    otherInfo: () => ({})
  }
);

const dialogVisible = ref(false);
const formData = ref<any>({});

watch(
  () => props.defaultInfo,
  (newVal) => {
    for (const item of props.modalConfig.formItems) {
      formData.value[`${item.field}`] = newVal[`${item.field}`];
    }
  }
);

const store = useStore();
const handleConfirmCLick = () => {
  if (Object.keys(props.defaultInfo).length) {
    // 更新
    store.dispatch('system/editPageDataAction', {
      pageName: props.pageName,
      editData: { ...formData.value, ...props.otherInfo },
      id: props.defaultInfo.id
    });
  } else {
    // 新增
    store.dispatch('system/createPageDataAction', {
      pageName: props.pageName,
      newData: { ...formData.value, ...props.otherInfo }
    });
  }
  dialogVisible.value = false;
};

defineExpose({
  dialogVisible
});
</script>

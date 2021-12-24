<template>
  <div class="custom-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form
      :label-width="labelWidth"
      label-position="right"
      size="mini"
      inline
      style="padding: 12px"
    >
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  :show-password="item.type === 'password'"
                ></el-input>
              </template>
              <template v-if="item.type === 'textarea'">
                <el-input
                  :type="item.type"
                  v-bind="item.otherOptions"
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-if="item.type === 'number'">
                <el-input
                  v-bind="item.otherOptions"
                  v-model.number="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select
                  v-model="formData[`${item.field}`]"
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :label="option.name"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  v-model="formData[`${item.field}`]"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, defineProps, withDefaults } from 'vue';
import { IFormItem } from './types';

const props = withDefaults(
  defineProps<{
    modelValue: any;
    formItems?: IFormItem[];
    labelWidth?: string;
    itemStyle?: any;
    colLayout?: any;
  }>(),
  {
    formItems: () => [],
    labelWidth: '100px',
    itemStyle: () => ({ width: '100%', marginBottom: 0, padding: '8px 0' }),
    colLayout: () => ({ xl: 6, lg: 8, md: 12, sm: 24, xs: 24 })
  }
);
const emit = defineEmits(['update:modelValue']);

const formData = ref({ ...props.modelValue });
watch(
  formData,
  (newVal) => {
    emit('update:modelValue', newVal);
  },
  { deep: true }
);
</script>

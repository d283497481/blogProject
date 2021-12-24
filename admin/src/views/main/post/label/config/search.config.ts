import { IForm } from '@/base-ui/form';

export const searchFormConfig: IForm = {
  labelWidth: '80px',
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '标签名',
      placeholder: '请输入标签名'
    },
    {
      type: 'datepicker',
      field: 'startTime',
      label: '开始时间',
      otherOptions: {
        placeholder: '请选择开始时间',
        type: 'date'
      }
    },
    {
      type: 'datepicker',
      field: 'endTime',
      label: '结束时间',
      otherOptions: {
        placeholder: '请选择结束时间',
        type: 'date'
      }
    }
  ]
};

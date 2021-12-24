import { IForm } from '@/base-ui/form/index';

export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      type: 'input',
      field: 'nickname',
      label: '昵称',
      placeholder: '请输入昵称'
    },
    {
      type: 'select',
      field: 'enable',
      label: '用户状态',
      placeholder: '请选择用户状态',
      options: [
        { name: '启用', value: 1 },
        { name: '停用', value: 0 }
      ]
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

import { IForm } from '@/base-ui/form';

export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '角色名称',
      placeholder: '请输入角色名称'
    },
    {
      type: 'input',
      field: 'intro',
      label: '权限介绍',
      placeholder: '请输入权限介绍'
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

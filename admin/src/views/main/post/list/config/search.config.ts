import { IForm } from '@/base-ui/form';

export const searchFormConfig: IForm = {
  formItems: [
    {
      type: 'input',
      field: 'title',
      label: '标题',
      placeholder: '请输入标题'
    },
    {
      type: 'input',
      field: 'abstract',
      label: '摘要',
      placeholder: '请输入摘要'
    },
    {
      type: 'select',
      field: 'labels',
      label: '标签',
      placeholder: '请选择标签',
      options: [],
      otherOptions: {
        multiple: true
      }
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

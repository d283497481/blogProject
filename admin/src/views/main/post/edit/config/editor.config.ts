import { IForm } from '@/base-ui/form';

export const editorConfig: IForm = {
  labelWidth: '50px',
  formItems: [
    {
      type: 'input',
      field: 'id',
      label: 'ID',
      isHidden: true
    },
    {
      type: 'input',
      field: 'title',
      label: '标题',
      placeholder: '请输入标题'
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
      type: 'textarea',
      field: 'abstract',
      label: '摘要',
      placeholder: '请输入摘要',
      otherOptions: {
        rows: 2
      }
    }
  ],
  colLayout: {
    span: 24
  }
};

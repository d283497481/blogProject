import { IModal } from '@/components/page-modal';

export const modalConfig: IModal = {
  title: '新建标签',
  labelWidth: '75px',
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '标签名',
      placeholder: '请输入标签名'
    }
  ],
  colLayout: {
    span: 24
  }
};

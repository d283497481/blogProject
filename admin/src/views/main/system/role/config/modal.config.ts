import { IModal } from '@/components/page-modal';

export const modalConfig: IModal = {
  title: '新建角色',
  labelWidth: '75px',
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '角色名',
      placeholder: '请输入角色名'
    },
    {
      type: 'input',
      field: 'intro',
      label: '角色介绍',
      placeholder: '请输入角色介绍'
    }
  ],
  colLayout: {
    span: 24
  }
};

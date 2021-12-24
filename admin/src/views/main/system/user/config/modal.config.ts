import { IModal } from '@/components/page-modal';

export const modalConfig: IModal = {
  title: '新建用户',
  labelWidth: '80px',
  formItems: [
    {
      type: 'input',
      field: 'name',
      label: '用户名',
      placeholder: '请输入用户名',
      isHidden: false
    },
    {
      type: 'password',
      field: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: false
    },
    {
      type: 'input',
      field: 'nickname',
      label: '昵称',
      placeholder: '请输入昵称'
    },
    {
      type: 'select',
      field: 'role_id',
      label: '角色',
      placeholder: '请选择角色',
      options: []
    }
  ],
  colLayout: {
    span: 24
  }
};

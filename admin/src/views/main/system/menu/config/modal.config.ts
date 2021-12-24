import { IModal } from '@/components/page-modal';

export const modalConfig: IModal = {
  title: '新建用户',
  labelWidth: '80px',
  formItems: [
    {
      type: 'select',
      field: 'level',
      label: '菜单级别',
      placeholder: '请选择菜单级别',
      options: [
        { name: '一级菜单', value: 1 },
        { name: '二级菜单', value: 2 },
        { name: '三级菜单', value: 3 }
      ]
    },
    {
      type: 'select',
      field: 'type',
      label: '菜单类型',
      placeholder: '请选择菜单类型',
      options: [
        { name: '管理端菜单', value: 1 },
        { name: '首页菜单', value: 2 }
      ]
    },
    {
      type: 'input',
      field: 'name',
      label: '菜单名称',
      placeholder: '请输入菜单名称'
    },
    {
      type: 'input',
      field: 'url',
      label: '菜单url',
      placeholder: '请输入菜单url'
    },
    {
      type: 'number',
      field: 'sort',
      label: '排序',
      placeholder: '请输入序号'
    },
    {
      type: 'input',
      field: 'icon',
      label: '菜单icon',
      placeholder: '请输入菜单icon'
    },
    {
      type: 'number',
      field: 'parent_id',
      label: '菜单icon',
      placeholder: '请输入父级菜单icon'
    },
    {
      type: 'input',
      field: 'permission',
      label: '权限标识',
      placeholder: '请输入权限标识'
    }
  ],
  colLayout: {
    span: 24
  }
};

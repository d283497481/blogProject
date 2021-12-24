export const contentTableConfig = {
  title: '菜单列表',
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100',
      slotName: 'name'
    },
    {
      prop: 'id',
      label: 'ID',
      minWidth: '50',
      slotName: 'name'
    },
    {
      prop: 'level',
      label: '等级',
      minWidth: '60',
      slotName: 'level'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100',
      slotName: 'url'
    },
    {
      prop: 'icon',
      label: '菜单图标',
      minWidth: '100',
      slotName: 'icon'
    },
    {
      prop: 'permission',
      label: '权限标识',
      minWidth: '100',
      slotName: 'permission'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '160',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '160',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      width: '120',
      slotName: 'handler'
    }
  ]
};

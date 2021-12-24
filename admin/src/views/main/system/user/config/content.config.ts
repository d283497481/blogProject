export const contentTableConfig = {
  title: '用户列表',
  showIndexColumn: true,
  showSelectColumn: true,
  propList: [
    { prop: 'name', label: '用户名', minWidth: '100', slotName: 'name' },
    {
      prop: 'nickname',
      label: '昵称',
      minWidth: '100',
      slotName: 'nickname'
    },
    { prop: 'status', label: '状态', minWidth: '100', slotName: 'status' },
    {
      prop: 'roleName',
      label: '角色',
      minWidth: '130',
      slotName: 'roleName'
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

export const contentTableConfig = {
  title: '标签列表',
  showIndexColumn: true,
  showSelectColumn: false,
  propList: [
    { prop: 'name', label: '标签名', minWidth: '100' },
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

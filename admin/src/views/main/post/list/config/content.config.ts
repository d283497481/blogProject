export const contentTableConfig = {
  title: '文章列表',
  showIndexColumn: true,
  showSelectColumn: false,
  propList: [
    {
      prop: 'title',
      label: '标题',
      minWidth: '100',
      slotName: 'title'
    },
    {
      prop: 'abstract',
      label: '摘要',
      minWidth: '100',
      slotName: 'abstract'
    },
    {
      prop: 'labels',
      label: '标签',
      minWidth: '120',
      slotName: 'labels'
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
      prop: 'user',
      label: '作者',
      minWidth: '88',
      slotName: 'user'
    },
    {
      label: '操作',
      width: '120',
      slotName: 'handler'
    }
  ]
};

import { IRule } from './global-types';

export const QueryRoleListRule: IRule[] = [
  {
    filed: 'pageSize',
    type: 'number',
    required: true,
    pattern: /[0-9]+/,
    message: '每页数据条数不能为空'
  },
  {
    filed: 'pageNum',
    type: 'number',
    required: true,
    pattern: /[0-9]+/,
    message: '当前页数不能为空'
  },
  {
    filed: 'name',
    type: 'string',
    required: false
  },
  {
    filed: 'intro',
    type: 'string',
    required: false
  }
];

export const EditRoleRule: IRule[] = [
  {
    filed: 'name',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '角色名必传'
  },
  {
    filed: 'intro',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '角色介绍必传'
  },
  {
    filed: 'menuList',
    type: 'array',
    required: true,
    message: '菜单列表必传'
  }
];

import { IRule } from './global-types';

export const QueryMenuListRule: IRule[] = [
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
  }
];

export const EditMenuRule: IRule[] = [
  {
    filed: 'type',
    type: 'number',
    required: true,
    message: '菜单类型必传'
  },
  {
    filed: 'level',
    type: 'number',
    required: true,
    pattern: /[0-9]+/,
    message: '菜单级别必传'
  },
  {
    filed: 'name',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '菜单名称必传'
  },
  {
    filed: 'url',
    type: 'string',
    required: false,
    pattern: /^\/[\w/]+/,
    message: 'url必须是以 / 开头的字符串'
  },
  {
    filed: 'icon',
    type: 'string',
    required: false
  },
  {
    filed: 'sort',
    type: 'number',
    required: false
  },
  {
    filed: 'parent_id',
    type: 'number',
    required: false
  },
  {
    filed: 'permission',
    type: 'string',
    required: false
  }
];

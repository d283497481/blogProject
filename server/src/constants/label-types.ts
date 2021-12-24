import { IRule } from './global-types';

export const EditLabelRule: IRule[] = [
  {
    filed: 'name',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '标签名不能为空'
  }
];

export const QueryLabelListRule: IRule[] = [
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
  }
];

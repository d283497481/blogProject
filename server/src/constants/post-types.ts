import { IRule } from './global-types';

export interface IPost {
  userId: number;
  title: string;
  abstract: string;
  content: string;
}

export const IPostRule: IRule[] = [
  {
    filed: 'title',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '文章标题不能为空'
  },
  {
    filed: 'abstract',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '文章摘要不能为空'
  },
  {
    filed: 'content',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '文章内容不能为空'
  }
];

export const SearchPostRule: IRule[] = [
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
    filed: 'title',
    type: 'string',
    required: false
  },
  {
    filed: 'labels',
    type: 'array',
    required: false
  },
  {
    filed: 'userId',
    type: 'number',
    required: false
  },
  {
    filed: 'startTime',
    type: 'string',
    required: false,
    pattern:
      /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/,
    message: '时间格式必须为 YYYY-MM-DD HH:mm:ss'
  },
  {
    filed: 'startTime',
    type: 'string',
    required: false,
    pattern:
      /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/,
    message: '时间格式必须为 YYYY-MM-DD HH:mm:ss'
  }
];

export const AddLabelRule: IRule[] = [
  {
    filed: 'labels',
    type: 'array',
    required: true,
    message: '标签值必须传数组类型'
  }
];

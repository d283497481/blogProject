import { IRule } from './global-types';

export const CreateCommentRule: IRule[] = [
  {
    filed: 'postId',
    type: 'number',
    required: true,
    pattern: /[0-9]+/,
    message: '文章ID必传'
  },
  {
    filed: 'content',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '评论内容不能为空'
  }
];

export const UpdateCommentRule: IRule[] = [
  {
    filed: 'content',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '评论内容不能为空'
  }
];

export const GetCommentListRule: IRule[] = [
  {
    filed: 'postId',
    type: 'number',
    required: true,
    pattern: /[0-9]+/,
    message: '文章ID必传'
  },
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

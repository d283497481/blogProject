import { IRule } from './global-types';

export const CreateUserRole: IRule[] = [
  {
    filed: 'name',
    type: 'string',
    required: true,
    pattern: /[\w]{5,15}/,
    message: '用户名必须是5-15位的字母、数字、下划线'
  },
  {
    filed: 'password',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '密码不能为空'
  },
  {
    filed: 'nickname',
    type: 'string',
    required: false
  },
  {
    filed: 'role_id',
    type: 'number',
    required: false
  }
];

export const UpdateUserRule: IRule[] = [
  {
    filed: 'nickname',
    type: 'string',
    required: false
  },
  {
    filed: 'role_id',
    type: 'number',
    required: false
  }
];

export const SearchUserRule: IRule[] = [
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
    filed: 'status',
    type: 'number',
    required: false
  },
  {
    filed: 'name',
    type: 'string',
    required: false
  },
  {
    filed: 'nickname',
    type: 'string',
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

export const UpdateStatusRule: IRule[] = [
  {
    filed: 'status',
    type: 'number',
    required: true,
    pattern: /[0-1]+/,
    message: '状态值是0或1'
  }
];

export const UpdatePasswordRule: IRule[] = [
  {
    filed: 'oldPassword',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '旧密码不能为空'
  },
  {
    filed: 'checkPassword',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '确认密码不能为空'
  },
  {
    filed: 'password',
    type: 'string',
    required: true,
    pattern: /\S/,
    message: '新密码不能为空'
  }
];

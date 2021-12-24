import { networkRequest } from '@/service';
import {
  IDataType,
  IPostDetails,
  IAccount,
  ILoginResult,
  IUserInfo,
  IComment
} from '@/service/types';

export function getPageListData(url: string, queryInfo: any) {
  return networkRequest.post<IDataType>({
    url,
    data: queryInfo
  });
}

// 获取文章详情接口
export function getPostDetails(postId: number) {
  return networkRequest.get<IDataType<IPostDetails>>({
    url: `/post/${postId}`
  });
}

// 注册接口
export function register(account: IAccount) {
  return networkRequest.post<IDataType>({
    url: `/user/register`,
    data: account
  });
}

// 登录接口
export function accountLogin(account: IAccount) {
  return networkRequest.post<IDataType<ILoginResult>>({
    url: '/login',
    data: account
  });
}

// 请求用户信息
export function getUserInfoById(userId: number) {
  return networkRequest.get<IDataType<IUserInfo>>({
    url: `/user/${userId}`
  });
}

// 评论接口
export function comment(comment: IComment) {
  return networkRequest.post<IDataType>({
    url: '/comment',
    data: comment
  });
}

// 回复评论接口
export function reply(commentId: number, comment: IComment) {
  return networkRequest.post<IDataType>({
    url: `/comment/${commentId}/reply`,
    data: comment
  });
}

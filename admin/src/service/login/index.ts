import { networkRequest } from '../index';
import { IDataType } from '../types';
import { IAccount, ILoginResult, IUserInfo, IUserMenu } from './types';

enum LoginAPI {
  login = '/login',
  UserInfo = '/user/',
  UserMenu = '/role/'
}

// 登录接口
export function accountLogin(account: IAccount) {
  return networkRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.login,
    data: account
  });
}

// 请求用户信息
export function getUserInfoById(userId: number) {
  return networkRequest.get<IDataType<IUserInfo>>({
    url: `${LoginAPI.UserInfo}${userId}`
  });
}

// 请求用户菜单
export function getUserMenusByRoleId(roleId: number) {
  return networkRequest.get<IDataType<{ list: IUserMenu[] }>>({
    url: `${LoginAPI.UserMenu}${roleId}/menu`
  });
}

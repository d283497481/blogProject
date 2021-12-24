import { IUserInfo, IUserMenu } from '@/service/login/types';

export interface ILoginState {
  [key: string]: any;
  token: string;
  userInfo: IUserInfo | null;
  userMenu: IUserMenu[];
  permissions: string[];
}

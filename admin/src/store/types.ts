import { ILoginState } from './login/types';
import { ISystemState } from './main/system/types';

export interface IRootState {
  [key: string]: any;
  entireRole: any[]; // 全部的角色
  entireMenu: any[]; // 全部的菜单
  entireLabel: any[];
}

export interface IRootWithModule extends IRootState {
  login: ILoginState;
  system: ISystemState;
}

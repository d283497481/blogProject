export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

export interface IRole {
  id: number;
  name: string;
  intro: string;
  createTime: string;
  updateTime: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  avatar_url: string;
  nickname: string;
  createTime: Date;
  updateTime: Date;
  role: IRole;
}

export interface IUserMenu {
  id: number;
  name: string;
  level: number;
  url?: string;
  sort?: number;
  parent_id?: any;
  icon?: string;
  type: number;
  permission?: any;
  createAt: Date;
  updateAt: Date;
  children: IUserMenu[];
}

export interface ISystemState {
  [key: string]: any; // 给接口的所有成员设置索引签名
  userList: any[];
  userCount: number;
  roleList: any[];
  roleCount: number;
  menuList: any[];
  menuCount: number;
  postList: any[];
  postCount: number;
  labelList: any[];
  labelCount: number;
  queryInfo: any;
}

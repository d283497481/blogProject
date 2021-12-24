export interface IDataType<T = any> {
  code: number;
  data: T;
  message: string;
}

export interface IUser {
  id: number;
  name: string;
  nickname?: string;
  avatarUrl?: string;
}

export interface IPost {
  id: number;
  title: string;
  abstract: string;
  content?: string;
  createAt: Date;
  updateAt: Date;
  user: IUser;
  image: string;
}

export interface ILabel {
  id: number;
  name: string;
}

export interface IPostDetails {
  post: IPost;
  labels: ILabel[];
  commentCount: number;
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

export interface IAccount {
  name: string;
  password: string;
}

export interface ILoginResult {
  id: number;
  name: string;
  token: string;
}

export interface IComment {
  postId: number;
  content: string;
}

export interface ICommentInfo {
  id: number;
  content: string;
  commentId?: number;
  createAt: Date;
  updateAt: Date;
  user: IUser;
  children?: ICommentInfo[];
}

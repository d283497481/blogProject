import { IPost, IUserInfo, ICommentInfo, ILabel } from '@/service/types';

export interface IRootState {
  [key: string]: any;
  showLoginBox: boolean;
  token: string;
  userInfo: IUserInfo | null;
  labelList: ILabel[];
  labelCount: number;
  postList: IPost[];
  postCount: number;
  commentList: ICommentInfo[];
  commentCount: number;
  keyword: string | null;
  label: ILabel | null;
}

import { ICommentInfo } from '@/service/types';

export interface ICommentReply extends ICommentInfo {
  parent?: ICommentInfo;
}

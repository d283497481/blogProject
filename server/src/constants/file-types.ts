import { IRule } from './global-types';

export const UploadPictrueRule: IRule[] = [
  {
    filed: 'postId',
    type: 'string',
    required: true,
    pattern: /[0-9]+/,
    message: '文章ID必传'
  }
];

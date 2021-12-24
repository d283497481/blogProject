import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import { verifyAuth, verifyResource } from '../../middleware/auth.middleware';
import { verifyParams } from '../../utils/verifyParams';
import {
  CreateCommentRule,
  GetCommentListRule,
  UpdateCommentRule
} from '../../constants/comment-types';
import commentController from '../../controller/comment.controller';

const router = new Router<DefaultState, Context>({ prefix: '/comment' });

// 发表评论接口
router.post('/', verifyAuth, verifyParams(CreateCommentRule), commentController.create);

// 回复评论
router.post(
  '/:commentId/reply',
  verifyAuth,
  verifyParams(CreateCommentRule),
  commentController.reply
);

// 修改评论
router.patch(
  '/:commentId',
  verifyAuth,
  verifyParams(UpdateCommentRule),
  verifyResource('comment'),
  commentController.update
);

// 删除评论
router.delete('/:commentId', verifyAuth, verifyResource('comment'), commentController.remove);

// 获取评论列表接口
router.post('/list', verifyParams(GetCommentListRule), commentController.list);

module.exports = router;

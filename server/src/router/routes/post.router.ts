import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import { verifyAuth, verifyResource } from '../../middleware/auth.middleware';
import { verifyParams } from '../../utils/verifyParams';
import { AddLabelRule, IPostRule, SearchPostRule } from '../../constants/post-types';
import postController from '../../controller/post.controller';

const router = new Router<DefaultState, Context>({ prefix: '/post' });

// 发布文章
router.post('/', verifyAuth, verifyParams(IPostRule), postController.create);

// 根据id获取文章详情
router.get('/:postId', postController.details);

// 获取文章列表
router.post('/list', verifyParams(SearchPostRule), postController.list);

// 修改文章，用户必须登录，用户必须具备权限
router.patch(
  '/:postId',
  verifyAuth,
  verifyResource('post'),
  verifyParams(IPostRule),
  postController.update
);

// 删除文章
router.delete('/:postId', verifyAuth, verifyResource('post'), postController.remove);

// 给文章添加标签
router.post('/:postId/labels', verifyAuth, verifyParams(AddLabelRule), postController.addLabels);

// 获取文章配图
router.get('/images/:filename', postController.fileInfo);

module.exports = router;

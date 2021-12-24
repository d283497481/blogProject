import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import fileController from '../../controller/file.controller';
import { verifyAuth } from '../../middleware/auth.middleware';
import { avatarHandler, pictureHandler, pictureResize } from '../../middleware/file.middleware';
import { verifyParams } from '../../utils/verifyParams';
import { UploadPictrueRule } from '../../constants/file-types';

const router = new Router<DefaultState, Context>({ prefix: '/upload' });

// 上传用户头像
router.post('/avatar', verifyAuth, avatarHandler, fileController.saveAvatarInfo);

// 上传文章配图
router.post(
  '/picture',
  verifyAuth,
  verifyParams(UploadPictrueRule),
  pictureHandler,
  pictureResize,
  fileController.savePictrueInfo
);

module.exports = router;

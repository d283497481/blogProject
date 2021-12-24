import { DefaultState, Context } from 'koa';
import Router from 'koa-router';
import {
  CreateUserRole,
  SearchUserRule,
  UpdateUserRule,
  UpdateStatusRule,
  UpdatePasswordRule
} from '../../constants/user-types';
import userController from '../../controller/user.controller';
import { verifyAuth, verifyPermission } from '../../middleware/auth.middleware';
import {
  verifyUser,
  handlePassword,
  verifyPassword,
  verifyNickname
} from '../../middleware/user.middleware';
import { verifyParams } from '../../utils/verifyParams';

// 创建路由对象
const router = new Router<DefaultState, Context>({ prefix: '/user' });

// 注册用户接口
router.post(
  '/register',
  verifyParams(CreateUserRole),
  verifyUser,
  handlePassword,
  userController.create
);

// 创建用户接口
router.post(
  '/',
  verifyAuth,
  verifyParams(CreateUserRole),
  verifyUser,
  handlePassword,
  userController.create
);

// 获取用户头像信息
router.get('/:userId/avatar', userController.avatarInfo);

// 获取用户列表
router.post('/list', verifyAuth, verifyParams(SearchUserRule), userController.list);

// 根据id获取用户信息
router.get('/:userId', verifyAuth, userController.info);

// 修改用户信息
router.patch(
  '/:userId',
  verifyAuth,
  verifyParams(UpdateUserRule),
  verifyNickname,
  userController.update
);

// 删除用户
router.delete('/:userId', verifyAuth, userController.delete);

// 更新账号状态
router.patch(
  '/:userId/status',
  verifyAuth,
  verifyParams(UpdateStatusRule),
  userController.updateStatus
);

// 修改用户密码
router.patch(
  '/:userId/updatePass',
  verifyAuth,
  verifyParams(UpdatePasswordRule),
  verifyPassword,
  handlePassword,
  userController.updatePassword
);

module.exports = router;

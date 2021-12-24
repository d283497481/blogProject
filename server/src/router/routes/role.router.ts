import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import roleController from '../../controller/role.controller';
import { verifyAuth } from '../../middleware/auth.middleware';
import { verifyParams } from '../../utils/verifyParams';
import { EditRoleRule, QueryRoleListRule } from './../../constants/role-types';

const router = new Router<DefaultState, Context>({ prefix: '/role' });

// 创建角色
router.post('/', verifyAuth, verifyParams(EditRoleRule), roleController.create);

// 根据角色id获取对应的菜单
router.get('/:roleId/menu', verifyAuth, roleController.getMenus);

// 修改角色
router.patch('/:roleId', verifyAuth, verifyParams(EditRoleRule), roleController.update);

// 删除角色
router.delete('/:roleId', verifyAuth, roleController.delete);

// 获取角色列表
router.post('/list', verifyAuth, verifyParams(QueryRoleListRule), roleController.list);

module.exports = router;

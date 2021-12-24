import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import menuController from '../../controller/menu.controller';
import { verifyAuth } from '../../middleware/auth.middleware';
import { verifyParams } from '../../utils/verifyParams';
import { QueryMenuListRule, EditMenuRule } from './../../constants/menu-types';

const router = new Router<DefaultState, Context>({ prefix: '/menu' });

// 创建菜单
router.post('/', verifyAuth, verifyParams(EditMenuRule), menuController.create);

// 修改菜单
router.patch('/:menuId', verifyAuth, verifyParams(EditMenuRule), menuController.update);

// 删除菜单
router.delete('/:menuId', verifyAuth, menuController.delete);

// 获取菜单列表
router.post('/list', verifyAuth, verifyParams(QueryMenuListRule), menuController.list);

module.exports = router;

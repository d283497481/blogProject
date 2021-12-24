import { Context, DefaultState } from 'koa';
import Router from 'koa-router';
import labelController from '../../controller/label.controller';
import { verifyAuth } from '../../middleware/auth.middleware';
import { verifyParams } from '../../utils/verifyParams';
import { EditLabelRule, QueryLabelListRule } from './../../constants/label-types';

const router = new Router<DefaultState, Context>({ prefix: '/label' });

// 创建标签接口
router.post('/', verifyAuth, verifyParams(EditLabelRule), labelController.create);

// 获取所有的标签
router.post('/list', verifyParams(QueryLabelListRule), labelController.list);

// 删除标签
router.delete('/:labelId', verifyAuth, labelController.delete);

// 修改标签
router.patch('/:labelId', verifyAuth, verifyParams(EditLabelRule), labelController.update);

module.exports = router;

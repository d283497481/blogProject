import { Context, Next } from 'koa';
import menuService from '../service/menu.service';
import { arrayToTree, notEmptyCheck } from '../utils';

class MenuController {
  async create(ctx: Context, next: Next) {
    try {
      const { body } = ctx.request;

      let insertField: any[] = [];
      const insertVals: any[] = [];
      for (const key in body) {
        if (notEmptyCheck(body[key])) {
          insertField.push(key);
          insertVals.push(body[key]);
        }
      }

      await menuService.create(insertField, insertVals);

      ctx.body = {
        code: 200,
        message: '添加菜单成功~'
      };
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }

  async update(ctx: Context, next: Next) {
    try {
      const { menuId } = ctx.params;
      const { body } = ctx.request;

      const updateField: any[] = [];
      const updateVals: any[] = [];
      for (const key in body) {
        if (notEmptyCheck(body[key])) {
          updateField.push(key);
          updateVals.push(body[key]);
        }
      }

      await menuService.update(menuId, updateField, updateVals);

      ctx.body = {
        code: 200,
        message: '修改菜单信息成功~'
      };
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }

  async delete(ctx: Context, next: Next) {
    const { menuId } = ctx.params;

    await menuService.delete(menuId);

    ctx.body = {
      code: 200,
      message: '删除菜单成功~'
    };
  }

  async list(ctx: Context, next: Next) {
    const result = await menuService.list();

    const list = arrayToTree(result, 'parent_id', null);

    ctx.body = {
      code: 200,
      message: '获取菜单列表成功~',
      data: {
        list,
        count: list.length
      }
    };
  }
}

export default new MenuController();

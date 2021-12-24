import { Context, Next } from 'koa';
import { ResultSetHeader } from 'mysql2';
import menuService from '../service/menu.service';
import roleService from '../service/role.service';
import { arrayToTree } from '../utils';
import { computedPagingValue } from '../utils/computedPagingValue';

class RoleController {
  async create(ctx: Context, next: Next) {
    try {
      const { name, intro, menuList } = ctx.request.body;

      const result = await roleService.create(name, intro);
      const roleId = (result as ResultSetHeader).insertId;
      menuList.forEach(async (menuId: number) => {
        await roleService.insertRoleMenuMapping(roleId, menuId);
      });

      ctx.body = {
        code: 200,
        message: '新建角色成功~'
      };
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }

  async getMenus(ctx: Context, next: Next) {
    const { roleId } = ctx.params;

    const result = await menuService.getMenusByRoleId(roleId);
    const list = arrayToTree(result, 'parent_id', null);

    ctx.body = {
      code: 200,
      message: '获取角色菜单成功~',
      data: {
        list
      }
    };
  }

  async update(ctx: Context, next: Next) {
    const { roleId } = ctx.params;
    const { name, intro, menuList } = ctx.request.body;

    await roleService.update(roleId, name, intro);
    await roleService.deleteRoleMenuMappingByRoleId(roleId);
    menuList.forEach(async (menuId: number) => {
      await roleService.insertRoleMenuMapping(roleId, menuId);
    });

    ctx.body = {
      code: 200,
      message: '修改角色信息成功~'
    };
  }

  async delete(ctx: Context, next: Next) {
    const { roleId } = ctx.params;

    await roleService.delete(roleId);

    ctx.body = {
      code: 200,
      message: '删除角色成功~'
    };
  }

  async list(ctx: Context, next: Next) {
    const { pageNum, pageSize, name, intro } = ctx.request.body;

    let where = 'WHERE 1 = 1';
    const values: any[] = [];
    if (name) {
      where += ' AND name like ?';
      values.push(`%${name}%`);
    }
    if (intro) {
      where += ' AND name like ?';
      values.push(`%${intro}%`);
    }

    const count = await roleService.getRoleCount(where, values);
    const [num, offset] = computedPagingValue(count, pageSize, pageNum);
    const result = await roleService.getRoleList(where, [...values, offset, pageSize]);

    ctx.body = {
      code: 200,
      message: '获取角色列表成功~',
      data: {
        list: result,
        count
      }
    };
  }
}

export default new RoleController();

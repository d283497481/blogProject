import fs from 'fs';
import { Context, Next } from 'koa';
import { UNABLE_TO_FIND_RESOURCES } from '../constants/error-types';
import fileService from '../service/file.service';
import userService from '../service/user.service';
import { notEmptyCheck } from '../utils';
import { computedPagingValue } from '../utils/computedPagingValue';

class UserController {
  async create(ctx: Context, next: Next) {
    const { body } = ctx.request;
    let insertField: any[] = [];
    const insertVals: any[] = [];
    for (const key in body) {
      if (notEmptyCheck(body[key])) {
        insertField.push(key);
        insertVals.push(body[key]);
      }
    }
    insertField.push('status');
    insertVals.push(1);

    // 操作数据库
    await userService.create(insertField, insertVals);

    ctx.body = {
      code: 200,
      message: '用户注册成功~',
      data: null
    };
  }

  async avatarInfo(ctx: Context, next: Next) {
    try {
      const { userId } = ctx.params;
      const result = await fileService.getAvatarByUserId(userId);
      const lastFile = result.pop();
      if (lastFile) {
        ctx.response.set('content-type', lastFile.mimetype);
        ctx.body = fs.createReadStream(`${lastFile.filepath}`);
      } else {
        throw new Error(UNABLE_TO_FIND_RESOURCES);
      }
    } catch (error) {
      ctx.app.emit('error', error, ctx);
    }
  }

  async list(ctx: Context, next: Next) {
    const { body } = ctx.request;
    let where = 'WHERE 1 = 1';
    const values: any[] = [];
    if (body.name) {
      where += ` AND u.name like ?`;
      values.push(`%${body.name}%`);
    }
    if (body.nickname) {
      where += ` AND u.nickname like ?`;
      values.push(`%${body.nickname}%`);
    }
    if (notEmptyCheck(body.status)) {
      where += ` AND u.status = ?`;
      values.push(body.status);
    }
    if (body.startTime) {
      where += ` AND u.createAt >= ?`;
      values.push(body.startTime);
    }
    if (body.endTime) {
      where += ` AND u.createAt < ?`;
      values.push(body.endTime);
    }
    const count = await userService.getUserCount(where, values);
    const [pageNum, offset] = computedPagingValue(count, body.pageSize, body.pageNum);
    const result = await userService.getUserList(where, values, offset, body.pageSize);
    result.forEach((item: any) => delete item.password);

    ctx.body = {
      code: 200,
      message: '获取用户列表成功~',
      data: {
        list: result,
        count,
        pageNum
      }
    };
  }

  async info(ctx: Context, next: Next) {
    const { userId } = ctx.params;

    const result = await userService.getUserInfoById(userId);

    ctx.body = {
      code: 200,
      message: '获取用户信息成功~',
      data: result
    };
  }

  async update(ctx: Context, next: Next) {
    const { userId } = ctx.params;
    const { body } = ctx.request;

    const updateField: any[] = [];
    const updateVals: any[] = [];
    for (const key in body) {
      if (notEmptyCheck(body[key])) {
        updateField.push(key);
        updateVals.push(body[key]);
      }
    }

    await userService.update(userId, updateField, updateVals);

    ctx.body = {
      code: 200,
      message: '更新用户信息成功~',
      data: null
    };
  }

  async delete(ctx: Context, next: Next) {
    const { userId } = ctx.params;

    await userService.delete(userId);

    ctx.body = {
      code: 200,
      message: '删除用户失败~',
      data: null
    };
  }

  async updateStatus(ctx: Context, next: Next) {
    const { userId } = ctx.params;
    const { status } = ctx.request.body;

    await userService.updateStatus(userId, status);

    ctx.body = {
      code: 200,
      message: `用户状态操作成功~`,
      data: null
    };
  }

  async updatePassword(ctx: Context, next: Next) {
    const { userId } = ctx.params;
    const { password } = ctx.request.body;

    await userService.updatePassword(userId, password);

    ctx.body = {
      code: 200,
      message: '密码修改成功~',
      data: null
    };
  }
}

export default new UserController();

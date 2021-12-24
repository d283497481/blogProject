import { Next, Context } from 'koa';
import jwt from 'jsonwebtoken';
import {
  NAME_OR_PASSWORD_IS_REQUIRED,
  USER_DOES_NOT_EXISTS,
  INCORRECT_USERNAME_OR_PASSWORD,
  UNAUTHORIZED,
  UNPREMISSION,
  ACCOUNT_IS_DISABLED
} from '../constants/error-types';
import userService from '../service/user.service';
import { md5Password } from '../utils/password-handle';
import { PUBLIC_KEY } from '../app/config';
import authService from '../service/auth.service';
import roleService from '../service/role.service';

// 登录校验函数
export async function verifyLogin(ctx: Context, next: Next) {
  try {
    const { name, password } = ctx.request.body;
    // 1.校验用户名与密码是否为空
    if (!name || !password) {
      throw new Error(NAME_OR_PASSWORD_IS_REQUIRED);
    }

    // 2.检查用户是否存在
    const [user] = await userService.getUserByName(name);
    if (!user) {
      throw new Error(USER_DOES_NOT_EXISTS);
    }

    // 3.判断用户名与密码是否一致
    if (user.password !== md5Password(password)) {
      throw new Error(INCORRECT_USERNAME_OR_PASSWORD);
    }

    // 4.验证用户是否启用
    if (user.status !== 1) {
      throw new Error(ACCOUNT_IS_DISABLED);
    }

    // 5.将查询出来的用户信息挂载到ctx上，以便在后续中间件中使用
    ctx.user = user;

    await next();
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
}

// 授权校验函数
export async function verifyAuth(ctx: Context, next: Next) {
  try {
    // 1.拿到 token
    const token = ctx.request.headers['x-token'] as string;
    if (!token) throw new Error(UNAUTHORIZED);

    // 2.校验 token
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    });
    ctx.user = result;

    await next();
  } catch (error: any) {
    if (error.message.includes('jwt')) ctx.app.emit('error', new Error(UNAUTHORIZED), ctx);
    else ctx.app.emit('error', error, ctx);
  }
}

export function verifyPermission(permission: string) {
  return async (ctx: Context, next: Next) => {
    try {
      const { role_id } = ctx.user;

      // 校验用户是否具有此权限
      const isPremission = await roleService.checkRolePermissin(role_id, permission);
      if (!isPremission) throw new Error(UNPREMISSION);

      await next();
    } catch (error) {
      return ctx.app.emit('error', error, ctx);
    }
  };
}

// 权限资源函数
export function verifyResource(tabName: string) {
  return async (ctx: Context, next: Next) => {
    try {
      const resourceId = ctx.params[`${tabName}Id`];
      const { id } = ctx.user;

      // 校验用户是否某些资源的操作权限
      const isPremission = await authService.checkResource(tabName, resourceId, id);
      if (!isPremission) throw new Error(UNPREMISSION);

      await next();
    } catch (error) {
      return ctx.app.emit('error', error, ctx);
    }
  };
}

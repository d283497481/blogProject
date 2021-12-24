import { Context, Next } from 'koa';
import userService from '../service/user.service';
import {
  USERNAME_ALEADY_EXISTS,
  NICKNAME_ALREADY_EXISTS,
  PARAMETER_VERIFICATION_FAILED,
  UNPREMISSION,
  USER_DOES_NOT_EXISTS
} from '../constants/error-types';
import { md5Password } from '../utils/password-handle';
import { notEmptyCheck } from '../utils';

// 验证用户
export async function verifyUser(ctx: Context, next: Next) {
  try {
    const { name, nickname } = ctx.request.body;
    // 验证用户是否存在
    const result = await userService.getUserByName(name);
    if (result.length) {
      throw new Error(USERNAME_ALEADY_EXISTS);
    }
    if (notEmptyCheck(nickname)) {
      const flag = await userService.hasNickname(nickname);
      if (flag) throw new Error(NICKNAME_ALREADY_EXISTS);
    }

    await next();
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
}

// 对密码进行加密
export async function handlePassword(ctx: Context, next: Next) {
  let { password } = ctx.request.body;
  ctx.request.body.password = md5Password(password);
  await next();
}

// 校验密码
export async function verifyPassword(ctx: Context, next: Next) {
  try {
    const { userId } = ctx.params;
    const { oldPassword, checkPassword } = ctx.request.body;

    if (Number(userId) !== ctx.user.id) {
      throw new Error(UNPREMISSION);
    }
    if (oldPassword !== checkPassword) {
      throw new Error(`${PARAMETER_VERIFICATION_FAILED}: 旧密码与确认密码不一致`);
    }

    const result = await userService.getUserById(userId);
    const user = result[0];
    if (!user) {
      throw new Error(USER_DOES_NOT_EXISTS);
    }
    if (md5Password(oldPassword) !== user.password) {
      throw new Error(`${PARAMETER_VERIFICATION_FAILED}: 旧密码错误`);
    }

    await next();
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
}

// 校验昵称
export async function verifyNickname(ctx: Context, next: Next) {
  try {
    const { nickname } = ctx.request.body;
    const flag = await userService.hasNickname(nickname);
    if (flag) throw new Error(NICKNAME_ALREADY_EXISTS);

    await next();
  } catch (error) {
    ctx.app.emit('error', error, ctx);
  }
}

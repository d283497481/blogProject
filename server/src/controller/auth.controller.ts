import { Context, Next } from 'koa';
import jwt from 'jsonwebtoken';
import { PRIVATE_KEY } from '../app/config';

class AuthController {
  async login(ctx: Context, next: Next) {
    const { id, name } = ctx.user;
    // 生成 token 令牌
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 24 * 60 * 60
    });

    ctx.body = {
      code: 200,
      message: '登录成功~',
      data: {
        id,
        name,
        token
      }
    };
  }
}

export default new AuthController();

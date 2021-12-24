import { Context, Next } from 'koa';

export async function corsHandler(ctx: Context, next: Next) {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, X-Token'
  );
  ctx.set('Access-Control-Allow-Methods', 'PUT, PATCH, POST, GET, DELETE, OPTIONS');
  if (ctx.method === 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
}

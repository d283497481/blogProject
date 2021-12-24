import path from 'path';
import Koa from 'koa';
import KoaBodyparser from 'koa-bodyparser';
import { useRoutes } from '../router';
import { corsHandler } from './cors-handle';
import { errorHandler } from './error-handle';
import koaStatic from 'koa-static';

// 创建应用程序
const app = new Koa();

// 解决跨域访问
app.use(corsHandler);

// 开放静态资源
app.use(koaStatic(path.resolve(__dirname, '../../public')));

// 使用中间件解析 application/json、application/x-www-form-urlencode 格式的请求体参数
app.use(
  KoaBodyparser({
    formLimit: '10mb',
    jsonLimit: '10mb'
  })
);

// 调用路由注册函数，注册路由表
useRoutes(app);

// 监听错误并处理
app.on('error', errorHandler);

export default app;

import fs from 'fs';
import path from 'path';
import Koa, { DefaultState, DefaultContext } from 'koa';

// 动态读取并注册路由表
export function useRoutes(app: Koa<DefaultState, DefaultContext>) {
  fs.readdirSync(path.resolve(__dirname, './routes')).forEach((file) => {
    const router = require(`./routes/${file}`);
    app.use(router.routes());
    app.use(router.allowedMethods());
  });
}

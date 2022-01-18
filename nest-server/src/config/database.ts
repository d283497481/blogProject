import { join } from 'path';
export default {
  type: 'mysql',
  host: 'localhost',
  // host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'ding888888',
  database: 'blog_api',
  entities: [join(__dirname, '../', '**/**.entity{.ts,.js}')], // 映射mysql的实体类的文件
  autoLoadEntities: true,
  synchronize: true,
};

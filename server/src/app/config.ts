import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// 将 .env 文件中的配置导入到 process.env 环境变量中
dotenv.config();

// 读取私钥和公钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/private.key'));
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/public.key'));

const { APP_HOST, APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } =
  process.env;

export {
  APP_HOST,
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  PRIVATE_KEY,
  PUBLIC_KEY
};

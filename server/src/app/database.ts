import mysql, { PoolConnection } from 'mysql2';
import { MYSQL_DATABASE, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from './config';

const connection = mysql.createPool({
  host: MYSQL_HOST,
  port: Number(MYSQL_PORT),
  database: MYSQL_DATABASE,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  connectionLimit: 15
});

connection.getConnection((error: any, conn: PoolConnection) => {
  if (error) {
    console.log('数据库连接失败~', error);
  } else {
    console.log(`数据库连接成功~`);
  }
});

export default connection.promise();

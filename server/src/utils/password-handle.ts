import crypto from 'crypto';

// 使用 md5 加密用户密码
export function md5Password(password: string) {
  const md5 = crypto.createHash('md5');
  const result = md5.update(`z${password}p`).digest('hex');
  return result;
}

import md5 from 'md5';

// 首字母转大写
export function capitalizeFirstLetter(target: string) {
  return target.charAt(0).toLocaleUpperCase() + target.substring(1);
}

// 处理密码
export function handlePassword(password: string) {
  return md5(`z${password}p`);
}

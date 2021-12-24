import md5 from 'md5';

export function handlePassword(password: string) {
  return md5(`z${password}p`);
}

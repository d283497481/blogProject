import request from 'request';
import os, { networkInterfaces } from 'os';
import uuid from 'uuid';
import fs from 'fs';
import { join } from 'path';
import net from 'net';
import { CronJob } from 'cron';
import ExifReader from 'exifreader';

console.log(os);

//公共文件

class mailboxSuffix {
  //邮箱后缀截取
  public partition: number | undefined;

  constructor(_mail?: string | undefined) {}

  int(mail: string, home = '@'): any {
    if (!mail) return;
    this.partition = mail.lastIndexOf(home);
    return mail.substring(this.partition, mail.length);
  }
}

/**
 * 生成随机数 用来做验证码
 * @param max 默认为6
 */
function andomCode(max = 6): string {
  let secretKey: string | undefined = '';
  for (let i = 0; i < max; i++) {
    secretKey += Math.floor(Math.random() * 10);
  }
  return secretKey;
}

// 获取本机ip
class systemOs {
  static IP() {
    const interfaces: any = networkInterfaces();
    for (const devName in interfaces) {
      const iface = interfaces[devName];
      for (let i = 0; i < iface.length; i++) {
        const alias = iface[i];
        if (
          alias.family === 'IPv4' &&
          alias.address !== '127.0.0.1' &&
          !alias.internal
        ) {
          return alias.address;
        }
      }
    }
  }

  static getClientIP(req: any): string {
    const client: any =
      req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
      req.connection.remoteAddress || // 判断 connection 的远程 IP
      req.socket.remoteAddress || // 判断后端的 socket 的 IP
      req.connection.socket.remoteAddress;
    return new mailboxSuffix().int(client, ':');
  }
}

/**
 * 获取目录下面所有的文件名称以及路径
 * @param startPath  String
 * 返回指定目录下面的文件路径
 */

type drim = {
  FileUrl: string;
  paths: Array<string>;
  FileName: string;
  type: string;
};

function findSync(startPath: string): Array<drim> {
  const result: Array<drim> = [];

  const finder = (path: string) => {
    const files = fs.readdirSync(path);
    files.forEach((val: string, _index: number, _list: Array<string>) => {
      const fPath = join(path, val),
        stats = fs.statSync(fPath);

      if (stats.isDirectory()) finder(fPath);

      if (stats.isFile()) {
        const add = fPath?.replace(/\\/g, '/');
        result.push({
          FileUrl: add,
          paths: add.split('/'),
          FileName: val,
          type: new mailboxSuffix().int(val, '.'),
        });
      }
    });
  };
  finder(startPath);
  return result;
}

function portIsOccupied(port: number) {
  // 创建服务并监听该端口
  const server = net.createServer().listen(port);
  let isPort = false;
  server.on('listening', function () {
    // 执行这块代码说明端口未被占用
    // server.close(); // 关闭服务
    isPort = false;
    console.log('The port【' + port + '】 is available.'); // 控制台输出信息
  });

  server.on('error', function (err: any) {
    if (err.code === 'EADDRINUSE') {
      isPort = true;
      // 端口已经被使用
      console.log(
        'The port【' + port + '】 is occupied, please change other port.',
      );
    }
  });

  return isPort;
}
interface readFileBase64 {
  url: string;
  coding?: string;
}
//读取文件返回 指定格式
function readFileBase64Sync(params: readFileBase64): Promise<string> {
  return new Promise((resolve, reject) => {
    const { url, coding } = params;
    if (url) {
      try {
        // fs.readFile(url, (Err: Error, data: Buffer) => {
        //   if (Err) return reject(Err);
        //   const selfieAnimebase64Img = new Buffer.from(data).toString(
        //     coding || 'base64',
        //   );
        //   resolve(selfieAnimebase64Img);
        // });
      } catch (error) {
        reject(error);
      }
    } else {
      reject('没有读取的文件路径');
    }
  });
}
// 写base64图片
interface writeBase64Img {
  FileUrl: string;
  image: string;
  type?: 'png' | 'jpg';
}
function writeBase64(ImageData: writeBase64Img): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      // console.log(__filename, ImageData);
      // const { FileUrl, image, type } = ImageData;
      // if (image && FileUrl) {
      //   const base64Data = image?.replace(/^data:image\/\w+;base64,/, ''),
      //     dataBuffer = new Buffer.from(base64Data, 'base64'),
      //     filesave = `${FileUrl}/${uuid.v4()}.${type || 'png'}`;
      //   fs.writeFile(filesave, dataBuffer, (error: any) => {
      //     error ? reject(error) : resolve(filesave);
      //   });
      // } else {
      //   reject({ msg: '缺少数据源', data: ImageData });
      // }
    } catch (error) {
      reject({ msg: 'writeBase64 写入错误', data: ImageData });
    }
  });
}

function httpRequest({
  url,
  data,
  interfaceClass,
  config = { headers: {}, json: true },
}: {
  url: string;
  data?: object;
  interfaceClass?: any;
  config?: any;
}): Promise<any> {
  const { headers, json } = config;
  return new Promise((resolve, reject) => {
    request(
      url,
      {
        headers: {
          'User-Agent': 'request',
          'content-type': 'application/json; charset=UTF-8',
          ...headers,
        },
        json,
      },
      (error: object, response: { statusCode: number }, body: any) => {
        type setType = string | number;
        const setList: Set<setType> = new Set([200, '200']);
        console.log(response?.statusCode);
        if (response?.statusCode && setList.has(response?.statusCode)) {
          if (interfaceClass instanceof Function) {
            const bodyData = new interfaceClass(body);
            resolve(bodyData);
          } else {
            resolve(body);
          }
        } else {
          reject(error);
        }
      },
    );
  });
}

// 编码类
class unscrambler {
  constructor(
    setDecode: (str: string) => string,
    getDecode: (str: string) => string,
  ) {
    Object.assign(this, { setDecode, getDecode });
  }
}
// 设置加密参数
const setDecode = (setObj: string) => {
  try {
    if (Object.keys(setObj).length > 0) setObj = JSON.stringify(setObj);
    const set = encodeURIComponent(setObj),
      result = Buffer.from(set, 'binary').toString('base64');
    return result;
  } catch (error) {
    return null;
  }
};

//解密参数
const getDecode = (getData: string) => {
  const jieMi = Buffer.from(getData, 'base64').toString('binary'),
    jieM = decodeURIComponent(jieMi);
  try {
    return JSON.parse(jieM);
  } catch (e) {
    return null;
  }
};

const decode = new unscrambler(setDecode, getDecode);

const isType = (data: any) => {
  if (data === '') return '';
  switch (Object.prototype.toString.call(data)) {
    case '[object Object]':
      return Object;
    case '[object Number]':
      return Number;
    case '[object Array]':
      return Array;
    case '[object Boolean]':
      return Boolean;
    case '[object Null]':
      return 'Null';
    case '[object Undefined]':
      return 'Undefined';
    case '[object String]':
      return String;
    case '[object Symbol]':
      return Symbol;
    case '[object Date]':
      return Date;
    case '[object BigInt]':
      return BigInt;
    case '[object Function]':
      return Function;
  }
};

/**
 * Promise NodeJS Promise拒绝处理收集方法
 * @param hadeleRejection 错误处理的回掉函数
 * @constructor
 */
const EventPollingPromiseError = (
  hadeleRejection: (
    Promise,
    reason,
    poccibyUnhandledRejection: Map<string, string>,
  ) => void,
) => {
  const poccibyUnhandledRejection: Map<string, string> = new Map();
  process.on('unhandledRejection', (reason: any, promise: any) => {
    poccibyUnhandledRejection.set(reason, promise);
  });

  process.on('rejectionHandled', (promise: any) => {
    poccibyUnhandledRejection.delete(promise);
  });

  setInterval(() => {
    poccibyUnhandledRejection.forEach((reason, promise) => {
      hadeleRejection(promise, reason, poccibyUnhandledRejection);
    });

    poccibyUnhandledRejection.clear();
  }, 6000);
};

/**
 * 浏览器事件循环 Promise 错误没有被处理
 * @param hadeleRejection
 */
// const browserEventTopPromiseError = (hadeleRejection: Function) => {
//   let poccibyunhandledRejection = new Map();

//   window.onunhandledrejection = (event: any) => {
//     poccibyunhandledRejection.set(event.promise, event.reason);
//   };

//   window.onrejectionhandled = (event: any) => {
//     poccibyunhandledRejection.delete(event.promise);
//   };

//   setInterval(() => {
//     poccibyunhandledRejection.forEach((reason, promise) => {
//       console.log(reason.message ? reason.message : reason);
//       hadeleRejection(promise, reason)
//     });

//     poccibyunhandledRejection.clear();
//   }, 6000);
// }

/**
 * 读取照片详细信息
 * @param ImageFileUrl 图片地址
 * @constructor
 */

const ImageConfieInfo = (ImageFileUrl: string) => {
  return new Promise((resolve, reject) => {
    if (!ImageFileUrl) reject({ code: 400, msg: '传入读取路基' });

    fs.readFile(ImageFileUrl, (error: Error, data: any) => {
      if (error) {
        console.error('Error reading file.');
        // process.exit(1);
        reject({ code: 400, msg: '读取文件错误' });
      }

      try {
        const tags = ExifReader.load(data, { expanded: true });
        // The MakerNote tag can be really large. Remove it to lower memory
        // usage if you're parsing a lot of files and saving the tags.
        if (tags.exif) {
          delete tags.exif['MakerNote'];
        }

        // If you want to extract the thumbnail you can save it like this:
        if (tags['Thumbnail'] && tags['Thumbnail'].image) {
          fs.writeFileSync(
            join(os.tmpdir(), 'thumbnail.jpg'),
            Buffer.from(tags['Thumbnail'].image),
          );
        }

        // If you want to extract images from the multi-picture metadata (MPF) you can save them like this:
        if (tags['mpf'] && tags['mpf']['Images']) {
          for (let i = 0; i < tags['mpf']['Images'].length; i++) {
            fs.writeFileSync(
              join(os.tmpdir(), `mpf-image-${i}.jpg`),
              Buffer.from(tags['mpf']['Images'][i].image),
            );
            // You can also read the metadata from each of these images too:
            // ExifReader.load(tags['mpf']['Images'][i].image, {expanded: true});
          }
        }
        resolve(tags);
      } catch (error) {
        const exifErrors = ExifReader.errors;
        if (error instanceof exifErrors.MetadataMissingError) {
          console.log('No Exif data found');
        }

        // console.error(error);
        // process.exit(1);

        reject(error);
      }
    });
  });
};

type dataType = {
  url: string;
  key: string;
  data: any;
};

/**
 * 函数重载
 * @param value 接需要序列化的对象
 */
function URLFlat(value: dataType): string;
function URLFlat(value: string, key: string, ObjeData: any): string;
function URLFlat(value: any, Autokey = '', OBj = ''): string {
  /**
   * 对象转为字符串
   * @param data
   * @returns
   */

  const ObjAndJSONFlat = (data: any) => {
    let str = '';
    if (data instanceof Object) {
      for (const k in data) {
        str += `&${k}=${data[k]}`;
      }
    }
    return str;
  };

  if (value instanceof Object) {
    const { url, key, data } = value;
    return `${url}?${key}${ObjAndJSONFlat(data)}`;
  } else {
    return `${value}?${Autokey}${ObjAndJSONFlat(OBj)}`;
  }
}
// const objStr  = (url: string, data: any) => {
//   let str: string = "", key = '24072919-f8cc00d3523032a7eaa25c6b1';
//   if (data instanceof Object) {
//     for (let k in data) {
//       str += `&${k}=${data[k]}`
//     }
//   }
//   return `${url}?key=${key}${str}`
// }

export {
  mailboxSuffix,
  andomCode,
  systemOs,
  findSync,
  readFileBase64Sync,
  writeBase64,
  httpRequest,
  decode,
  isType,
  EventPollingPromiseError,
  ImageConfieInfo,
  portIsOccupied,
  URLFlat,
};

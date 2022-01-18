import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { Buffer } from 'buffer';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { method, path } = req;
    // console.log(req.headers);
    console.log(
      `请求方式:${method} 请求路径:${path} ${req.ip} 强求body参数:${JSON.stringify( req.body)} 请求quer参数: ${JSON.stringify(req.query)},请求params参数: ${JSON.stringify(req.params)} 请求浏览器指纹: ${req.headers['authorization']}`,
    );

    // req.RequestBody = {
    //   ...req.body,
    //   ...req.query,
    //   ...req.params,
    //   fingerprint:req.headers['authorization'],
    // };
    // req.body = {
    //   ...req.body,
    //   base64Data: Buffer.from(JSON.stringify(req.body)).toString('base64'),
    // };
    // console.log(res.send);
    // console.log(Buffer.from('自夏').toString('base64'));

    next();
  }
}

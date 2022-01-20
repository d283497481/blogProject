import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//主路径是"admin"
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 1. 固定路径：
  //可以匹配到 get请求，http://localhost:9000/app/list
  @Get('list')
  getHello(): string {
    return this.appService.getHello();
  }
}

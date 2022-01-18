import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { FiltershttpExceptionFilter } from './common/filters/http-exception.filter';
import { RequstSendInterceptor } from './common/filters/http-requset.send.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('NestJS 学习')
    .setDescription('学习过程使创建得API相关接口')
    .setVersion('1.0')
    .addTag('Nest.JS And REST API ')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('doc', app, document);

  // 全局注入错误过滤器
  app.useGlobalFilters(new FiltershttpExceptionFilter());
  // 注入全局成功响应
  app.useGlobalInterceptors(new RequstSendInterceptor());
  // 设置跨域
  app.enableCors();
  await app.listen(4000);
}
bootstrap();

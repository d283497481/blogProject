import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as serveStatic from 'serve-static';
// import * as compression from 'fastify-compress';
import * as compression from 'compression';

import { join } from 'path';
import { HttpExceptionFilter } from '@/core/filter/http-exception.filter';
import { TransformInterceptor } from '@/core/interceptor/transform.interceptor';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug'],
  });
  app.setGlobalPrefix('api'); // 设置全局路由前缀
  // Static resource directory
  app.use(
    '/public',
    serveStatic(join(__dirname, '../public'), {
      maxAge: '1d',
      extensions: [],
    }),
  );
  app.use(compression());
  app.useGlobalFilters(new HttpExceptionFilter()); // 注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局注册拦截器

  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('笔记')
    .setDescription('笔记接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(9080);
}
bootstrap();

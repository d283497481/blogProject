import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { resolve } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from 'nestjs-config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { BlogModule } from './modules/blog/blog.module';
import { classificationAModule } from './modules/classificationA/classification.module';
import { classificationBModule } from './modules/classificationB/classification.module';
import { uploadFileModule } from './modules/uploadFile/uploadFile.module';
import { discussModule } from './modules/discuss/discuss.module';
import { ScatteredModule } from './modules/scattered/scattered.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { join } from 'path';

console.log(join(__dirname, 'uploads'), __dirname);

@Module({
  imports: [
    ConfigModule.load(resolve(__dirname, 'config', '**/!(*.d).{ts,js}')), // 读取配置文件夹下面得配置文件
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => config.get('database'),
      inject: [ConfigService], // 外部服务注入到
    }),
    ServeStaticModule.forRoot({
      // 配置静态文件访问
      rootPath: join(__dirname, 'uploads'),
    }),
    BlogModule,
    classificationAModule,
    classificationBModule,
    uploadFileModule,
    discussModule,
    ScatteredModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    // 为 hello 路由添加中间件
    consumer
      .apply(LoggerMiddleware) // 使用中间件
      .exclude(
        { path: 'doc', method: RequestMethod.GET },
        { path: 'static', method: RequestMethod.GET },
      ) // 排除 某个请求 path 以及 method 请求方法 POST
      .forRoutes('blog/list','discuss/getblogdiscuss'); // 监听 某个路径 如果要全部使用这个中间件就为空 .forRoutes('hello') 监听hello 这个路径
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { blogController } from './blog.controller';
import { blogService } from './blog.service';
import { blogEntity } from './blog.entity';

@Module({
  imports: [TypeOrmModule.forFeature([blogEntity])], // 这里要使用模型，不然在 service 中无法使用
  controllers: [blogController],
  providers: [blogService],
})
export class BlogModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { discussController } from './discuss.controller';
import { discussService } from './discuss.service';
import { discussEntity } from './discuss.entity';

@Module({
  imports: [TypeOrmModule.forFeature([discussEntity])], // 这里要使用模型，不然在 service 中无法使用
  controllers: [discussController],
  providers: [discussService],
})
export class discussModule {}

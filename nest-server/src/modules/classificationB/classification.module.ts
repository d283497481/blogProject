import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { classificationController } from './classification.controller';
import { classificationService } from './classification.service';
import { classificationEntity } from './classification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([classificationEntity])], // 这里要使用模型，不然在 service 中无法使用
  controllers: [classificationController],
  providers: [classificationService],
})
export class classificationBModule {}


import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScatteredController } from './scattered.controller';
import { ScatteredService } from './scattered.service';
import { scatteredEntity } from './scattered.entity';

@Module({
  imports: [TypeOrmModule.forFeature([scatteredEntity])], // 这里要使用模型，不然在 service 中无法使用
  controllers: [ScatteredController],
  providers: [ScatteredService],
})
export class ScatteredModule {}

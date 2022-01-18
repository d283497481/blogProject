import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ConfigService } from 'nestjs-config';
import { updateFilsController } from './uploadFile.controller';
import { updateFilsService } from './uploadFile.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('file'),
      inject: [ConfigService],
    }),
  ],
  controllers: [updateFilsController],
  providers: [updateFilsService],
})
export class uploadFileModule {}

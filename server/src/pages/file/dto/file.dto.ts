import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class FileDto {
  @ApiProperty({ description: '文件名称' })
  @IsString({ message: '文件必填' })
  readonly fileName: any;
}

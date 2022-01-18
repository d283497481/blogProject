import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Ip,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { classificationService } from './classification.service';

class addClass {
  @ApiProperty({ description: '1', example: '一级分类id' })
  classa: number;
  @ApiProperty({ description: 'vue', example: '分类名称' })
  name: string;
  @ApiProperty({ description: '帖子内容', example: '分类封面' })
  cover: string;
  id?: number;
}

@ApiTags('二级分类')
@Controller('classificationB')
export class classificationController {
  constructor(private readonly classification: classificationService) {}

  /**
   * 添文章分类
   * @param bodyData 文章分类参数
   * @returns {}
   */
  @Post('/add')
  addClass(@Body() bodyData: addClass) {
    if ('name' in bodyData && 'classa' in bodyData) {
      return this.classification.Add(bodyData);
    } else {
      throw new HttpException(
        {
          message: '缺少必要参数',
          error: '缺少 name 参数 或者是父id',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/list')
  async getBlogs(@Query() query: any, @Ip() ip: string) {
    return await this.classification.list(
      parseInt(query.pageNo),
      parseInt(query.pageSize),
    );
  }
}

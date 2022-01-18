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
  @ApiProperty({ description: 'vue', example: '分类名称' })
  name: string;
  @ApiProperty({ description: '帖子内容', example: '分类封面' })
  cover: string;
  id?: number;
}

@ApiTags('一级分类')
@Controller('classificationA')
export class classificationController {
  constructor(private readonly classification: classificationService) {}

  /**
   * 添文章分类
   * @param bodyData 文章分类参数
   * @returns {}
   */
  @Post('/add')
  addClass(@Body() bodyData: addClass) {
    console.log(bodyData);

    if ('name' in bodyData) {
      return this.classification.Add(bodyData);
    } else {
      throw new HttpException(
        {
          message: '缺少必要参数',
          error: '缺少 name 参数',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 获取列表
   * @param query 请求得参数
   * @param ip 访问者IP
   * @returns {}
   */
  @Get('/list')
  async getBlogs(@Query() query: any, @Ip() ip: string) {
    console.log('获取博客数据响应', query, ip);

    return await this.classification.list(
      parseInt(query.pageNo),
      parseInt(query.pageSize),
    );
  }

  @Delete('/del')
  @ApiProperty({ description: '1', example: '删除id' })
  async del(@Query() { id }) {
    return await this.classification.del(id);
  }
  @Post('/update')
  async createMany(@Body() Body: addClass) {
    const { id, name, cover } = Body;

    return this.classification.update(id, {
      name,
      cover,
    });
  }
}

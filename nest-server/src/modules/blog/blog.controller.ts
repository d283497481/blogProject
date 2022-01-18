import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Delete,
  Param,
  Ip,
  Query,
  Headers
} from '@nestjs/common';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
import { blogService } from './blog.service';
import { IsInt, isNotEmpty, Max, Min } from 'class-validator';

class createPostsDto {
  @ApiProperty({ description: '帖子标题', example: '帖子帖子帖子标题' })
  title: string;
  @ApiProperty({ description: '帖子内容', example: '帖子内容' })
  txt: string;
  @ApiProperty({ description: '帖子内容', example: '帖子内容' })
  cover: Array<string>;
  id?: number;
}

class blogList {
  @ApiProperty({ description: '当前页码', example: '0' })
  pageNo: string;
  @ApiProperty({ description: '当前数据量', example: '5' })
  pageSize: string;
}

@ApiTags('博客相关API')
@Controller('blog')
export class blogController {
  constructor(private readonly blogService: blogService) { }

  @Post('/blogdateli')
  async blogdateli(@Body() Body: createPostsDto) {
    const { id } = Body;
    return await this.blogService.update(id);
  }

  /**
   * 获取博客列表
   * @returns []
   */
  @Get('/list')
  async getBlogs(@Query() query: blogList, @Ip() ip: string, @Headers() headers: Headers) {
    console.log('获取博客数据响应', query, ip,headers);

    return await this.blogService.getBlogList(
      parseInt(query.pageNo),
      parseInt(query.pageSize),
    );
  }

  /**
   * 添加博客
   * @param param {}
   * @returns {}
   */

  @Post('/add')
  async findAll(@Body() param: createPostsDto) {
    if ('title' in param && 'txt' in param && 'belongs' in param) {
      'id' in param && delete param.id;

      return await this.blogService.blogAdd({
        ...param,
        cover: param?.cover?.join(','),
      });
    } else {
      throw new HttpException(
        {
          message: '缺少必要参数',
          error: '缺少 title 或 txt 或者 belongs 参数',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 删除博客
   * @param param {id}
   * @returns {}
   */
  @Delete()
  async del(@Body() param) {
    if (isNaN(param.id)) {
      throw new HttpException(
        {
          message: '删除参数有误',
          error: '删除id 必须为数字',
        },
        HttpStatus.BAD_REQUEST,
      );
    }

    const start = await this.blogService.del(param.id);
    if (start) {
      return {};
    } else {
      throw new HttpException(
        {
          message: '无效删除',
          error: '删除数据不存在',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Post('/update')
  async createMany(@Body() Body: createPostsDto) {
    const { id, title, txt, cover } = Body;
    await this.blogService.update(id, {
      title,
      txt,
      cover: cover?.join(','),
    });
    return true;
  }
}

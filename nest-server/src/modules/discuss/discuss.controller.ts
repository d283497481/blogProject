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
import { discussService } from './discuss.service';

class createPostsDto {
  @ApiProperty({ description: '评论内容', example: '这个文章真好' })
  txt: string;
  id?: number;
  @ApiProperty({ description: '1', example: '文章id' })
  blogid: number;
}

@ApiTags('文章评论')
@Controller('discuss')
export class discussController {
  constructor(private readonly blogService: discussService) {}

  /**
   * 获取博客列表评论
   * @returns []
   */
  @Get('/list')
  async getBlogs(@Query() query, @Ip() ip: string) {
    console.log('获取博客数据响应', query, ip);

    return await this.blogService.getBlogList(
      parseInt(query.pageNo),
      parseInt(query.pageSize),
    );
  }

  /**
   * 添加博客评论
   * @param param {}
   * @returns {}
   */

  @Post('/add')
  async findAll(@Body() param: createPostsDto) {
    if ('txt' in param && 'blogid' in param) {
      'id' in param && delete param.id;

      return await this.blogService.blogAdd({
        ...param,
      });
    } else {
      throw new HttpException(
        {
          message: '缺少必要参数',
          error: '缺少 id 或者 txt 参数',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 删除评论
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
    const { id, blogid, txt } = Body;
    return await this.blogService.update(id, {
      txt,
      blogid,
    });
  }

  /**
   * 获取博客评论数据
   * @param param {id}
   * @returns {}
   */
  @Post('/getblogdiscuss')
  async blogdiscuss(@Body() param) {
    if (isNaN(param.id)) {
      throw new HttpException(
        {
          message: '删除参数有误',
          error: '删除id 必须为数字',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.blogService.update(param.id).catch((err: Error) => {
      throw new HttpException(
        {
          message: `获取id为 ${param.id} 评论失败`,
          error: err,
        },
        HttpStatus.BAD_REQUEST,
      );
    });
  }
}

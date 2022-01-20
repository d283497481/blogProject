import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { FileDto } from './dto/file.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('文件管理')
@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  /**
   * 新建文件
   */
  @ApiOperation({ summary: '创建文件' })
  @UseGuards(AuthGuard('jwt'))
  @Post('add')
  @UseInterceptors(FileInterceptor('file'))
  async create(@UploadedFile() file, @Body() props: FileDto) {
    return await this.fileService.create(file, props);
  }

  /**
   * 获取所有文件
   */
  @ApiOperation({ summary: '获取所有文件' })
  @Get('list')
  async findAllList() {
    return await this.fileService.findAllList();
  }

  /**
   * 删除分类
   */
  @ApiOperation({ summary: '删除文件' })
  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  async remove(@Body() params) {
    await this.fileService.remove(params);
    return '删除成功！';
  }
}

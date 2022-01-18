import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateFilsService } from './uploadFile.service';
import { ApiTags, ApiProperty } from '@nestjs/swagger';
@ApiTags('博客相关API')
@Controller('updateFiles')
export class updateFilsController {
  constructor(private readonly albumService: updateFilsService) { }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    const { accessPath, encoding, filename, mimetype, size } =
      this.albumService.upload(file);
    console.log(typeof accessPath, accessPath);
    return {
      accessPath,
      encoding,
      filename,
      mimetype,
      size,
    };
  }

  // @Get('export')
  // async downloadAll(@Res() res: Response) {
  //   const { filename, tarStream } = await this.albumService.downloadAll();
  //   res.setHeader('Content-Type', 'application/octet-stream');
  //   res.setHeader(
  //     'Content-Disposition',
  //     `attachment; filename=${filename}`,
  //   );
  //   tarStream.pipe(res);
  // }
}

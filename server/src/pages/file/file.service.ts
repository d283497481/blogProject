import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import { createReadStream, unlink, createWriteStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository?: Repository<FileEntity>,
  ) {}

  // 创建分类
  async create(
    file: any,
    props: Partial<FileEntity> | any,
  ): Promise<FileEntity> {
    const fileName = `${Date.now()}-${props.fileName}`;
    const cws = createWriteStream(
      join(__dirname, '../../../../public/upload/', fileName),
    );
    cws.write(file.buffer);
    return await this.fileRepository.save({ ...props, fileName });
  }

  //查看所有文件
  async findAllList(): Promise<FileEntity[]> {
    const qb = await getRepository(FileEntity).createQueryBuilder('file');
    qb.where('1=1');
    qb.orderBy('file.create_time', 'DESC');
    return await qb.getMany();
  }

  // 刪除文件
  async remove(params) {
    const existPost = await this.fileRepository.findOne(params.fileId);
    if (!existPost) {
      throw new HttpException(`id为${params.fileId}的文件不存在`, 601);
    }
    unlink(existPost.fileName, (err) => {
      if (err) {
        throw new HttpException('删除失败', 601);
      }
    });
    return await this.fileRepository.remove(existPost);
  }
}

import { discussEntity } from './discuss.entity';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository, Connection, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { getData } from 'src/common/utils/publicMethod';

type addBlog = {
  txt: string;
  blogid: number;
};

@Injectable()
export class discussService {
  constructor(
    @InjectRepository(discussEntity)
    private readonly blogRepository: Repository<discussEntity>,
    private connection: Connection,
  ) {}

  /**
   * 获取博客数据
   * @param pageNo 当前页码 默认为0
   * @param pageSize 当前页面总数 默认为 5
   */
  public async getBlogList(pageNo = 0, pageSize = 5) {
    console.log(pageNo, pageSize);

    try {
      const db = await this.blogRepository.createQueryBuilder();

      const [list, totalCont] = await db
        .skip(pageNo * pageSize) // 跳过前面x 条
        .take(pageSize) // 从x 开始获取
        .getManyAndCount();

      return { dataList: list, totalCont };
    } catch (error) {
      Logger.error('获取数据失败', error);
    }
  }

  /**
   * 添加博客数据
   * @param blog 博客数据
   * @returns 插入成功返回空对象{}
   */
  public async blogAdd(blog: addBlog) {
    try {
      const addData = await this.blogRepository.save({
        ...blog,
        datetime: getData(),
      });
      Logger.log('插入数据成功', addData);
      return addData && {};
    } catch (error) {
      Logger.error('插入数据失败', error);
    }
  }

  /**
   * 删除博客
   */
  public async del(id: number) {
    try {
      const { raw, affected } = await this.blogRepository
        .createQueryBuilder()
        .delete()
        .from(discussEntity)
        .where('id = :id', { id })
        .execute();

      Logger.log('删除状态', raw, affected, affected ? true : false);

      return affected ? true : false;
    } catch (error) {
      Logger.error(`删除数据失败 删除id为${id}`, error);
      throw new HttpException(
        {
          message: '缺少必要参数',
          error: '缺少 title 或者 txt 参数',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  /**
   * 修改博客
   * @param id 修改博客id
   * @param data 修改博客数据
   */
  public async update(id: number, data?: addBlog) {
    try {
      if (id) {
        return await getRepository(discussEntity).find({
          where: { blogid: id },
        });
      } else if (id && data) {
        return await getConnection()
          .createQueryBuilder()
          .update(discussEntity)
          .set(data)
          .where('id = :id', { id })
          .execute();
      }
    } catch (error) {
      Logger.error(`修改或者获取 评论失败id为${id}`, error);
      throw new HttpException(
        {
          message: '操作mysql失败',
          error,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}

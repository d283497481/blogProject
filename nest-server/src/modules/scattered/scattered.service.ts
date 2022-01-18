import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository, Connection, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { scatteredEntity } from './scattered.entity';
import { getData } from '../../common/utils/publicMethod';


type addBlog = {
  title: string;
  txt: string;
  cover: string;
};


@Injectable()
export class ScatteredService {

  constructor(
    @InjectRepository(scatteredEntity)
    private readonly blogRepository: Repository<scatteredEntity>,
    private connection: Connection,
  ) {}

  /**
   * 获取博客数据
   * @param pageNo 当前页码 默认为0
   * @param pageSize 当前页面总数 默认为 5
   */
  public async getBlogList(pageNo = 0, pageSize = 5) {
    try {

      const db = await this.blogRepository.createQueryBuilder();
      const [list, totalCont] = await db
        .skip((pageNo - 1) * pageSize) // 跳过前面x 条
        .take(pageSize) // 从x 开始获取
        .getManyAndCount();
      // const Count = await db.getManyAndCount();

      const newList = list.map((item) => {
        return { ...item, cover: item?.cover?.split(',') };
      });
      return { dataList: newList, totalCont };
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
        .from(scatteredEntity)
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
   * 修改博客 或者获取博客
   * @param id 修改博客id
   * @param data 修改博客数据
   */
  public async update(id: number, data?: addBlog) {
    try {
      if (id) {
        return await getRepository(scatteredEntity).findOne({
          where: { id },
        });
      } else if (id && data) {
        const { raw, affected } = await getConnection()
          .createQueryBuilder()
          .update(scatteredEntity)
          .set(data)
          .where('id = :id', { id })
          .execute();
        Logger.log('修改状态', raw, affected, affected ? true : false);
        return affected && {};
      }
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
}

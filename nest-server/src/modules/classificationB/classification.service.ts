import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Repository, Connection, getRepository, getConnection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { classificationEntity } from './classification.entity';
import { getData } from 'src/common/utils/publicMethod';

type add = {
  name: string;
  cover: string;
};

@Injectable()
export class classificationService {
  constructor(
    @InjectRepository(classificationEntity)
    private readonly classification: Repository<classificationEntity>,
    private connection: Connection,
  ) {}
  /**
   * 获取博客数据
   * @param pageNo 当前页码 默认为0
   * @param pageSize 当前页面总数 默认为 5
   */
  public async list(pageNo = 0, pageSize = 5) {
    console.log(pageNo, pageSize);

    try {
      // 有参数进行分页
      if (!isNaN(pageNo) && !isNaN(pageSize)) {
        const db = await this.classification.createQueryBuilder();
        const [list, totalCont] = await db
          .skip(pageNo * pageSize) // 跳过前面x 条
          .take(pageSize) // 从x 开始获取
          .getManyAndCount();

        const newList = list.map((item) => {
          return { ...item, cover: item.cover ? item.cover.split(',') : '' };
        });

        return { dataList: newList, totalCont };
      } else {
        // 查询所有数据
        const db = await getRepository(classificationEntity).find();
        return { dataList: db, totalCont: db.length };
      }
    } catch (error) {
      Logger.error('获取数据失败', error);
    }
  }

  /**
   * 添加博客数据
   * @param blog 博客数据
   * @returns 插入成功返回空对象{}
   */
  public async Add(blog: add) {
    try {
      const addData = await this.classification.save({
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
      const { raw, affected } = await this.classification
        .createQueryBuilder()
        .delete()
        .from(classificationEntity)
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
  public async update(id: number, data: add) {
    console.log(id, data);

    try {
      const { raw, affected } = await getConnection()
        .createQueryBuilder()
        .update(classificationEntity)
        .set(data)
        .where('id = :id', { id })
        .execute();
      Logger.log('修改状态', raw, affected, affected ? true : false);
      return affected && {};
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

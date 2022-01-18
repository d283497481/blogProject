import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/***
 * 创建博客表
 * 装饰器装饰的模型。将为此类模型创建数据库表。
 */
@Entity({ name: 'discuss' })
export class discussEntity {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column('varchar') // 内容
  txt: string;

  @Column({ type: 'int' }) //文章id
  blogid: number;

  @Column('datetime') // 创建时间
  datetime: Date;
}

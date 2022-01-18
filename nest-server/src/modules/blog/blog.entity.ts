import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/***
 * 创建博客表
 * 装饰器装饰的模型。将为此类模型创建数据库表。
 */
@Entity({ name: 'bloglist' })
export class blogEntity {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column({ length: 50 }) // 文章标题
  title: string;

  @Column('longtext') // 文章
  txt: string;

  @Column({ length: 10 }) //文章分类id 多个以逗号隔开
  belongs: string;

  @Column({ type: 'varchar' }) // 封面
  cover: string;

  @Column({ length: 50 }) // 文章对应的浏览器指纹
  fingerprint:string;

  @Column('datetime') // 创建时间
  datetime: Date;
}

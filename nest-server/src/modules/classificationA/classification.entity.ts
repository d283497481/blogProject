import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { classificationEntity as classbEntity } from '../classificationB/classification.entity';
/***
 * 创建文章一级分类表
 * 装饰器装饰的模型。将为此类模型创建数据库表。
 */
@Entity({ name: 'classificationa' })
export class classificationEntity {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column({ length: 50 }) // 分类名称
  name: string;

  @Column({ length: 100 }) // 封面
  cover: string;

  @Column('datetime') // 创建时间
  datetime: Date;

  @OneToMany(() => classbEntity, (classb) => classb.id)
  classb: classbEntity[];
}

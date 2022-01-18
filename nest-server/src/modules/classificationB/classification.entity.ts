import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { classificationEntity as classaEntity } from '../classificationA/classification.entity';

/***
 * 创建文章二级分类表
 * 装饰器装饰的模型。将为此类模型创建数据库表。
 */
@Entity({ name: 'classificationb' })
export class classificationEntity {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column({ type: 'int' }) //一级分类id
  classa: number;

  @PrimaryColumn() // 分类名称
  name: string;

  @Column({ length: 100 }) // 封面
  cover: string;

  @Column('datetime') // 创建时间
  datetime: Date;

  @ManyToOne(() => classaEntity, (classb) => classb.id)
  classb: classaEntity;
}

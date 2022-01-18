import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

/***
 * 创建零散知识表
 * 装饰器装饰的模型。将为此类模型创建数据库表。
 */
@Entity({ name: 'scattered' })
export class scatteredEntity {
  @PrimaryGeneratedColumn() // 主键自增
  id: number;

  @Column('varchar') // 标题
  title: string;


  @Column({ type: 'int' })         //记录类型
  type:number;

  @Column('longtext') // 记录内容
  txt: string;

  @Column({ type: 'varchar' }) // 封面
  cover: string;

  @Column('datetime') // 创建时间
  datetime: Date;
}

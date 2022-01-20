import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn()
  fileId: number; // 标记为主列，值自动生成

  @Column({ default: '' })
  fileName: string;

  //创建时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  create_time: Date;

  //更新时间
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    select: false,
  })
  update_time: Date;
}

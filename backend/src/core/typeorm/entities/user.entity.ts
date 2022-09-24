import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  email: string;

  @CreateDateColumn({
    type: 'datetime',
    update: false,
  })
  createdAt: DateTime;

  @UpdateDateColumn({
    type: 'datetime',
  })
  updatedAt: DateTime;

  @DeleteDateColumn({
    type: 'datetime',
    default: null,
  })
  deletedAt: DateTime;
}

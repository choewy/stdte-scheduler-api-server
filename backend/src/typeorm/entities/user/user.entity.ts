import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { DateTimeColumn } from '@/typeorm/helpers';
import { UserRelation } from './user.relation';

@Entity('user')
export class User extends UserRelation {
  @PrimaryGeneratedColumn()
  readonly uid: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @DateTimeColumn()
  created_at: DateTime;

  @DateTimeColumn()
  updated_at: DateTime;

  @DateTimeColumn({ default: null })
  deleted_at: DateTime | null;

  @BeforeInsert()
  protected beforeInsert() {
    this.created_at = DateTime.local();
    this.updated_at = DateTime.local();
    this.deleted_at = null;
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updated_at = DateTime.local();
  }
}

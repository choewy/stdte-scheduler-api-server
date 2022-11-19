import { DateTime } from 'luxon';
import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeColumn } from '../../columns';
import { UserStatus, UserType } from './enums';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'tinyint' })
  type: UserType;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Wait,
  })
  status: UserStatus;

  @DateTimeColumn({ update: false })
  createdAt: DateTime;

  @DateTimeColumn()
  updatedAt: DateTime;

  @DateTimeColumn({ default: null })
  deletedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local();
    this.updatedAt = DateTime.local();
    this.deletedAt = null;
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = DateTime.local();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.deletedAt = DateTime.local();
  }
}

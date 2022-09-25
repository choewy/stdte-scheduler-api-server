import {
  CreateDateTimeColumn,
  DeleteDateTimeColumn,
  UpdateDateTimeColumn,
} from '../columns';
import { DateTime } from 'luxon';
import { BeforeInsert, BeforeSoftRemove, BeforeUpdate } from 'typeorm';
import { localDateTime } from '@/core/datetime';

export class DateTimeEntity {
  @CreateDateTimeColumn()
  createdAt: DateTime;

  @UpdateDateTimeColumn()
  updatedAt: DateTime;

  @DeleteDateTimeColumn()
  deletedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = localDateTime();
    this.updatedAt = localDateTime();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = localDateTime();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.updatedAt = localDateTime();
  }
}

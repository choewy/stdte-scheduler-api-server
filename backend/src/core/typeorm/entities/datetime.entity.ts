import {
  CreateDateTimeColumn,
  DeleteDateTimeColumn,
  UpdateDateTimeColumn,
} from '../columns';
import { DateTime } from 'luxon';
import { BeforeInsert, BeforeSoftRemove, BeforeUpdate } from 'typeorm';
import { LocalDateTime } from '@/core/datetime';

export class DateTimeEntity {
  @CreateDateTimeColumn()
  createdAt: DateTime;

  @UpdateDateTimeColumn()
  updatedAt: DateTime;

  @DeleteDateTimeColumn()
  deletedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = LocalDateTime();
    this.updatedAt = LocalDateTime();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = LocalDateTime();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.updatedAt = LocalDateTime();
  }
}

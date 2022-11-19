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
import { Team } from '../team';
import { TaskStatus, TaskType } from './enums';

class MapTypes {
  teams: Team[];
}

@Entity()
export class Task extends MapTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TaskType,
  })
  type: TaskType;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  summary: string;

  @Column({ default: null })
  revenue: string;

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.Staging,
  })
  status: TaskStatus;

  @DateTimeColumn({ default: null })
  startAt: DateTime;

  @DateTimeColumn({ default: null })
  endAt: DateTime;

  @DateTimeColumn({ default: null })
  warrantyAt: DateTime;

  @DateTimeColumn({ update: false })
  createdAt: DateTime;

  @DateTimeColumn()
  updatedAt: DateTime;

  @DateTimeColumn({ default: null })
  deletedAt: DateTime | null;

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

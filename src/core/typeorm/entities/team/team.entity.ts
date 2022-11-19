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
import { Task } from '../task';
import { User } from '../user';

class MapTypes {
  users: User[];
  tasks: Task[];
}

@Entity()
export class Team extends MapTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

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

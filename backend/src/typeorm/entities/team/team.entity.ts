import { DateTimeColumn } from '@/typeorm/helpers';
import { DateTime } from 'luxon';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TeamRelation } from './team.relation';

@Entity('team')
export class Team extends TeamRelation {
  @PrimaryGeneratedColumn()
  readonly tid: number;

  @Column()
  name: string;

  @DateTimeColumn()
  created_at: DateTime;

  @DateTimeColumn()
  updated_at: DateTime;

  @DateTimeColumn({ default: null })
  deleted_at: DateTime;

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

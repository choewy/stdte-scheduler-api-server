import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { DateTimeColumn } from '@/typeorm/helpers';
import { OAuthPlatform } from './enums';
import { OAuthRelation } from './oauth.relation';

@Entity('oauth')
export class OAuth extends OAuthRelation {
  @PrimaryGeneratedColumn()
  readonly aid: number;

  @PrimaryColumn()
  oid: string;

  @PrimaryColumn()
  platform: OAuthPlatform;

  @Column()
  nickname: string;

  @Column()
  profile_image: string;

  @DateTimeColumn()
  created_at: DateTime;

  @DateTimeColumn()
  updated_at: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.created_at = DateTime.local();
    this.updated_at = DateTime.local();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updated_at = DateTime.local();
  }
}

import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { RolePolicy } from './role-policy.entity';
import { DateTimeTransformer } from '../transformers';

class Relation {
  @OneToOne(() => RolePolicy, (e) => e.role, { cascade: true })
  @JoinColumn()
  rolePolicy: RolePolicy;
}

@Entity('role')
export class Role extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @CreateDateColumn({
    update: false,
    transformer: new DateTimeTransformer(),
  })
  createdAt: Date;

  @UpdateDateColumn({
    transformer: new DateTimeTransformer(),
  })
  updatedAt: Date;

  @DeleteDateColumn({
    default: null,
    transformer: new DateTimeTransformer(),
  })
  deletedAt: Date;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = DateTime.local().toJSDate();
    this.updatedAt = DateTime.local().toJSDate();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = DateTime.local().toJSDate();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.updatedAt = DateTime.local().toJSDate();
  }
}

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DateTime } from 'luxon';
import { Role } from './role.entity';

class Relation {
  @ManyToMany(() => Role, (e) => e.users)
  @JoinTable({ name: 'user_roles' })
  roles: Role[];
}

@Entity('user')
export class User extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column({ default: null })
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

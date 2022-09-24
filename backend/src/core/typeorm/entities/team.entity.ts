import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DateTimeEntity } from './datetime.entity';
import { User } from './user.entity';

class Relation extends DateTimeEntity {
  @ManyToMany(() => User, (e) => e.teams)
  users: User[];
}

@Entity('team')
export class Team extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  name: string;

  @Column({ default: false })
  default: boolean;
}

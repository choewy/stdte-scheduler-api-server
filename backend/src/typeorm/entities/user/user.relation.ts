import { OneToMany } from 'typeorm';
import { OAuth } from '../oauth';

export class UserRelation {
  @OneToMany(() => OAuth, (e) => e.uid)
  oauths: OAuth[];
}

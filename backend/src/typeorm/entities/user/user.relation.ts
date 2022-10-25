import { OneToMany } from 'typeorm';
import { OAuth } from '../oauth';
import { Role } from '../role';

export class UserRelation {
  @OneToMany(() => OAuth, (e) => e.uid)
  oauths: OAuth[];
  roles: Role[];
}

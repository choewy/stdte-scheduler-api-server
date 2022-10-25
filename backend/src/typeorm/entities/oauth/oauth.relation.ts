import { JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user';

export class OAuthRelation {
  @ManyToOne(() => User)
  @JoinColumn({ name: 'uid' })
  uid: User;
}

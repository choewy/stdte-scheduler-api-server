import { localDateTime } from '@/core/datetime';
import { DateTime } from 'luxon';
import { BeforeInsert, BeforeSoftRemove, Entity, PrimaryColumn } from 'typeorm';
import { CreateDateTimeColumn, DeleteDateTimeColumn } from '../../columns';

@Entity('socket')
export class Socket {
  @PrimaryColumn()
  userId: number;

  @PrimaryColumn()
  socketId: string;

  @CreateDateTimeColumn()
  connectedAt: DateTime;

  @DeleteDateTimeColumn()
  disConnectedAt: DateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.connectedAt = localDateTime();
  }

  @BeforeSoftRemove()
  protected beforeSoftRemove() {
    this.disConnectedAt = localDateTime();
  }
}

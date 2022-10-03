import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeEntity } from '../datetime.entity';
import { ChatRoom } from '../chat-room';
import { User } from '../user';

class Reltaion extends DateTimeEntity {
  @ManyToOne(() => ChatRoom, (e) => e.chatMessages, { onDelete: 'CASCADE' })
  chatRoom: ChatRoom;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  sender: User;

  @ManyToOne(() => User, {
    onDelete: 'CASCADE',
    eager: true,
  })
  @JoinColumn()
  receiver: User;
}

@Entity('chat_message')
export class ChatMessage extends Reltaion {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: 'text' })
  text: string;

  @Column({ default: false })
  checked: boolean;
}

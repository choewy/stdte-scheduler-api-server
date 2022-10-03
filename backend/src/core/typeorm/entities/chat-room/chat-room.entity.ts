import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from '../chat-message/chat-message.entity';
import { User } from '../user';

class Relation {
  @OneToMany(() => ChatMessage, (e) => e.chatRoom, { cascade: true })
  @JoinColumn()
  chatMessages: ChatMessage[];

  @ManyToOne(() => User, (e) => e.chatRooms, { onDelete: 'CASCADE' })
  @JoinColumn()
  host: User | null;
}

@Entity('chat_room')
export class ChatRoom extends Relation {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ default: '' })
  name: string;
}

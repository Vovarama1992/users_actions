import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.types';

@Entity('actions')
export class Action {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column({ type: 'jsonb', nullable: true })
  details: Record<string, any>;

  @ManyToOne(() => User, (user) => user.actions)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Action } from './actions.types';

@Entity('authusers')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Action, (action) => action.user)
  actions: Action[];
}

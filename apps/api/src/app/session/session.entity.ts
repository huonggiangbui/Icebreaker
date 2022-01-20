import {
  Entity,
  Column,
  JoinTable,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import { Session as ISession } from '@icebreaker/shared-types';
import { User } from '../user/user.entity';
import { Metadata } from '../types/Metadata';
import { Question } from '../question/question.entity';

@Entity()
export class Session implements ISession {
  @PrimaryColumn({unique: true})
  code: string;

  @OneToMany(() => User, (u) => u.session, { onDelete: "RESTRICT", lazy: true })
  players: User[];

  @ManyToMany(() => Question, (q) => q.sessions, { onDelete: "CASCADE", lazy: true, cascade: ["insert", "update"] })
  @JoinTable()
  questions: Question[];

  @Column(() => Metadata)
  metadata: Metadata;
}

import {
  Entity,
  Column,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { User as IUser } from '@icebreaker/shared-types';
import { Session } from '../session/session.entity';
import { Answer } from '../answer/answer.entity';
import { Question } from '../question/question.entity';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Session, (s) => s.players, { onDelete: "CASCADE", lazy: true })
  session: Session;

  @OneToMany(() => Question, (q) => q.owner, { onDelete: "RESTRICT", lazy: true })
  questions: Question[];

  @OneToMany(() => Answer, (a) => a.owner, { onDelete: "RESTRICT", lazy: true })
  answers: Answer[];

  @Column('text', { array: true, default: [] })
  refresh_tokens: string[];
}

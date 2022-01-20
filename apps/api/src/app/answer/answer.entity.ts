import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { Answer as IAnswer} from '@icebreaker/shared-types';
import { User } from '../user/user.entity';
import { Metadata } from '../types/Metadata';
import { Question } from '../question/question.entity';

@Entity()
export class Answer implements IAnswer {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => User, (u) => u.answers, { onDelete: "RESTRICT", lazy: true })
  owner: User;

  @ManyToOne(() => Question, (q) => q.answers, { onDelete: "RESTRICT", lazy: true })
  question: Question;

  @Column()
  content: string;

  @Column(() => Metadata)
  metadata: Metadata;
}

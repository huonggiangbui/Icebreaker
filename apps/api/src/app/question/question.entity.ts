import {
  Entity,
  Column,
  JoinTable,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { GameTypes, Question as IQuestion } from '@icebreaker/shared-types';
import { User } from '../user/user.entity';
import { Session } from '../session/session.entity';
import { Metadata } from '../types/Metadata';
import { Answer } from '../answer/answer.entity';

@Entity()
export class Question implements IQuestion {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    type: "enum",
    enum: GameTypes,
  })
  type: GameTypes;

  @ManyToOne(() => User, (u) => u.questions, { onDelete: "CASCADE", lazy: true })
  owner: User;

  @ManyToMany(() => Session, (s) => s.questions, { onDelete: "CASCADE", lazy: true, cascade: ["insert", "update"] })
  @JoinTable()
  sessions: Session[];

  @Column()
  content: string;

  @Column('simple-array', { nullable: true })
  choices?: string[];

  @OneToMany(() => Answer, (a) => a.question, { onDelete: "RESTRICT", lazy: true })
  answers: Answer[];

  @Column(() => Metadata)
  metadata: Metadata;
}

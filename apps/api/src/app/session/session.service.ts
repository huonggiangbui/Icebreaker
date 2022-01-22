import {
  forwardRef,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Session } from './session.entity';
import { GameTypes, Session as ISession } from '@icebreaker/shared-types';
import * as crypto from 'crypto';
import { User } from '../user/user.entity';
import { QuestionService } from '../question/question.service';

export interface IPayload {
  id: string;
}

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    @Inject(forwardRef(() => QuestionService))
    private questionService: QuestionService,
    private readonly connection: Connection,
  ) {}
  async create(): Promise<Session> {
    const code = crypto.randomBytes(3).toString('hex');
    const newSession = this.sessionRepository.create({code});
    await this.sessionRepository.save(newSession);

    return newSession;
  }

  async findByCode(
    code: string,
    options?: FindOneOptions<Session>
  ): Promise<Session> {
    try {
      return this.sessionRepository.findOneOrFail(
        { code },
        options
      );
    } catch (err) {
      Logger.error(err);
      throw new NotFoundException('Cannot find room with code ' + code)
    }
  }

  async getSession(
    code: string,
    options?: FindOneOptions<Session>
  ): Promise<ISession> {
    try {
      const session = await this.sessionRepository.findOneOrFail(
        { code },
        options
      );
      const players = await session.players;
      const questions = await session.questions;
      return { players, questions };
    } catch (err) {
      Logger.error(err);
      throw new NotFoundException('Cannot find room with code ' + code)
    }
  }

  async update(user: User, code: string, type: GameTypes): Promise<any> {
    const session = await this.sessionRepository.findOneOrFail(
      { code }
    );
    const host = (await session.players)[0];
    if (host.id === user.id) {
      const questions = await this.questionService.findAllByType(type);
      (await session.questions).push(...questions);
      return this.sessionRepository.save(session);
    }
    throw new UnauthorizedException;
  }

  async remove(user: User, code: string): Promise<void> {
    const session = await this.sessionRepository.findOneOrFail(code);
    const host = (await session.players)[0];
    if (host.id === user.id) {
      await this.sessionRepository.delete(code);
      return
    }
    throw new UnauthorizedException;
  }
}

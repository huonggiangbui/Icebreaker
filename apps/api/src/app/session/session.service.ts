import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  createQueryBuilder,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Session } from './session.entity';
import * as crypto from 'crypto';
import { User } from '../user/user.entity';

export interface IPayload {
  id: string;
}

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private readonly connection: Connection,
  ) {}
  async create(): Promise<Session> {
    const code = crypto.randomBytes(3).toString('hex');
    const newSession = this.sessionRepository.create({code});
    await this.sessionRepository.save(newSession);

    return newSession;
  }

  // findAll(options?: FindManyOptions<User>): Promise<User[]> {
  //   return this.userRepository.find(options);
  // }

  async findByCode(
    code: string,
    options?: FindOneOptions<Session>
  ): Promise<Session> {
    try {
      const session = await this.sessionRepository.findOneOrFail(
        { code },
        options
      );
      await session.players;
      await session.questions;
      return session;
    } catch (err) {
      Logger.error(err);
      throw new Error('Cannot find room with code: ' + code);
    }
  }

  async remove(user: User, code: string): Promise<void> {
    const session = await this.sessionRepository.findOneOrFail(code);
    if (this.isSessionHost(user, session)) {
      await this.sessionRepository.delete(code);
      return
    }
    throw new UnauthorizedException;
  }

  async isSessionHost(user: User, session: Session): Promise<boolean> {
    const sessionHost = (await session).players[0]
    return sessionHost == user
  }

}

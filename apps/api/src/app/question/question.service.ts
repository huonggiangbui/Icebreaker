import { GameTypes } from '@icebreaker/shared-types';
import {
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
import { Session } from '../session/session.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { CreateQuestionDto } from './dto/create-question';
import { Question } from './question.entity';

export interface IPayload {
  id: string;
}

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
    private userService: UserService,
    private readonly connection: Connection,
  ) {}
  async create(host: User, data: CreateQuestionDto): Promise<void | Question> {
    const { session_code, ...rest } = data;

    const newQuestion = this.questionRepository.create(rest);
    await this.questionRepository.save(newQuestion);

    try {
      await this.connection
        .createQueryBuilder()
        .relation(Question, "owner")
        .of(newQuestion)
        .set(host);

    } catch (err) {
      console.error(err);
      throw err;
    }

    if (session_code) {
      const session = await this.sessionRepository.findOneOrFail({code: session_code});
      (await session.questions).push(newQuestion);
      await this.sessionRepository.save(session);
    }

    return newQuestion;
  }

  async findAllByType(type: GameTypes, options?: FindManyOptions<Question>): Promise<Question[]> {
    const admin = await this.userService.findById(process.env.ADMIN_ID);
    return Promise.resolve(await admin.questions).then(async (questions) => {
      const filteredQuestion = questions.filter(q => q.type === type);
      return filteredQuestion
    })
  }

  async findById(
    id: string,
    options?: FindOneOptions<Question>
  ): Promise<Question> {
    try {
      const question = await this.questionRepository.findOneOrFail(
        { id },
        options
      );
      await question.answers;
      return question;
    } catch (err) {
      Logger.error(err);
      throw new Error('Cannot find question with id: ' + id);
    }
  }

  // async remove(user: User, code: string): Promise<void> {
  //   const session = await this.sessionRepository.findOneOrFail(code);
  //   if (this.isSessionHost(user, session)) {
  //     await this.sessionRepository.delete(code);
  //     return
  //   }
  //   throw new UnauthorizedException;
  // }

  // async isSessionHost(user: User, session: Session): Promise<boolean> {
  //   const sessionHost = (await session).players[0]
  //   return sessionHost == user
  // }

}

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
import { QuestionService } from '../question/question.service';
import { Session } from '../session/session.entity';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './dto/create-answer';

export interface IPayload {
  id: string;
}

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    private questionService: QuestionService,
    private readonly connection: Connection,
  ) {}
  async create(host: User, data: CreateAnswerDto): Promise<void | Answer> {
    const newAnswer = this.answerRepository.create({content: data.content});
    await this.answerRepository.save(newAnswer);

    const question = await this.questionService.findById(data.question_id)

    try {
      await this.connection
        .createQueryBuilder()
        .relation(Answer, "owner")
        .of(newAnswer)
        .set(host);

      await this.connection
        .createQueryBuilder()
        .relation(Answer, "question")
        .of(newAnswer)
        .set(question);

    } catch (err) {
      console.error(err);
      throw err;
    }

    return newAnswer;
  }

  // async findAllByType(type: GameTypes, options?: FindManyOptions<Question>): Promise<Question[]> {
  //   const admin = await this.userService.findById(process.env.ADMIN_ID);
  //   return Promise.resolve(await admin.questions).then(async (questions) => {
  //     const filteredQuestion = questions.filter(q => q.type === type);
  //     return filteredQuestion
  //   })
  // }

  // async findByCode(
  //   code: string,
  //   options?: FindOneOptions<Session>
  // ): Promise<Session> {
  //   try {
  //     const session = await this.sessionRepository.findOneOrFail(
  //       { code },
  //       options
  //     );
  //     await session.players;
  //     return session;
  //   } catch (err) {
  //     Logger.error(err);
  //     throw new Error('Cannot find room with code: ' + code);
  //   }
  // }

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

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
  Repository,
} from 'typeorm';
import { QuestionService } from '../question/question.service';
import { User } from '../user/user.entity';
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
  async create(user: User, data: CreateAnswerDto): Promise<void | Answer> {
    const newAnswer = this.answerRepository.create({content: data.content});
    await this.answerRepository.save(newAnswer);

    const question = await this.questionService.findById(data.question_id)

    try {
      await this.connection
        .createQueryBuilder()
        .relation(Answer, "owner")
        .of(newAnswer)
        .set(user);

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

}

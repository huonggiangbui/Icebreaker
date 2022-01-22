import { GameTypes } from '@icebreaker/shared-types';
import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { TheUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { CreateQuestionDto } from './dto/create-question';
import { Question } from './question.entity';

import { QuestionService } from './question.service';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) { }

  @UseGuards(JwtAuthGuard)
  @Post("questions")
  async addQuestion(@TheUser() host: User, @Body() body: CreateQuestionDto): Promise<void | Question> {
    return this.questionService.create(host, body)
  }

  @UseGuards(JwtAuthGuard)
  @Get("questions/:type")
  async getManyQuestions(@Param('type') type: GameTypes): Promise<Question[]> {
    return this.questionService.findAllByType(type)
  }

  @UseGuards(JwtAuthGuard)
  @Get("question/:id")
  async getOneQuestion(@Param('id') id: string): Promise<Question> {
    return this.questionService.findById(id)
  }
}

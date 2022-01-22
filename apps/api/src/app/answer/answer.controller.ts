import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { TheUser } from '../user/user.decorator';
import { User } from '../user/user.entity';
import { Answer } from './answer.entity';

import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer';

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }

  @UseGuards(JwtAuthGuard)
  @Post("answers")
  async addQuestion(@TheUser() user: User, @Body() body: CreateAnswerDto): Promise<void | Answer> {
    return this.answerService.create(user, body)
  }
}

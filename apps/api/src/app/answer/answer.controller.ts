import { GameTypes } from '@icebreaker/shared-types';
import { BadRequestException, Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
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
  async addQuestion(@TheUser() host: User, @Body() body: CreateAnswerDto): Promise<void | Answer> {
    return this.answerService.create(host, body)
  }

  // @UseGuards(JwtAuthGuard)
  // @Get("answers/:id")
  // async getAnswers(@Param('id') id: string): Promise<Question[]> {
  //   return this.questionService.findAllByType(type)
  // }

  // @UseGuards(JwtAuthGuard)
  // @Delete('questions')
  // deleteRoom(@TheUser() user: User, @Param('code') code: string) {
  //   return this.questionService.remove(host, code)
  // }
}

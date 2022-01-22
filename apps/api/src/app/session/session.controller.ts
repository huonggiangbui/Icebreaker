import { GameTypes, Session } from '@icebreaker/shared-types';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../user/guards/jwt-auth.guard';
import { TheUser } from '../user/user.decorator';
import { User } from '../user/user.entity';

import { SessionService } from './session.service';

@Controller()
export class SessionController {
  constructor(private readonly sessionService: SessionService) { }

  @Post("sessions")
  async createRoom(): Promise<void | Session> {
    return this.sessionService.create()
  }

  @Get("sessions/:code")
  async getRoom(@Param('code') code: string): Promise<Session> {
    return this.sessionService.getSession(code)
  }

  @UseGuards(JwtAuthGuard)
  @Put('sessions/:code')
  update(@TheUser() host: User, @Param('code') code: string, @Body() body: { type: GameTypes }) {
    return this.sessionService.update(host, code, body.type)
  }

  @UseGuards(JwtAuthGuard)
  @Delete('sessions/:code')
  deleteRoom(@TheUser() host: User, @Param('code') code: string) {
    return this.sessionService.remove(host, code)
  }
}

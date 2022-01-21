import { Body, Controller, Delete, Post,  UseGuards } from '@nestjs/common';
import { Tokens } from '../types/Tokens';
import { CreateUserDto } from './dto/create-user';
// import { Tokens } from '../types/Tokens';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TheUser } from './user.decorator';
import { User } from './user.entity';

import { UserService } from './user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post("users")
  async register(@Body() body: CreateUserDto): Promise<void | Tokens> {
    if (body.name) {
      return this.userService.create(body)
    } else if (body.refresh_token) {
      return {
        access_token: await this.userService.refreshToken(body.refresh_token),
        refresh_token: body.refresh_token
      }
    } else {
      throw new Error('Must provide credential or refresh token');
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users')
  deleteUser(@TheUser() user: User) {
    return this.userService.remove(user)
  }
}

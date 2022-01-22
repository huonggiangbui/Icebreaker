import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from '../session/session.entity';
import { SessionModule } from '../session/session.module';
import { UserModule } from '../user/user.module';
import { QuestionController } from './question.controller';
import { Question } from './question.entity';
import { QuestionService } from './question.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Session]),
    forwardRef(() => SessionModule),
    UserModule,
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}

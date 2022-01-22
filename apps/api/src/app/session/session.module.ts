import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModule } from '../question/question.module';
import { SessionController } from './session.controller';
import { Session } from './session.entity';
import { SessionService } from './session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session]),
    forwardRef(() => QuestionModule)
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}

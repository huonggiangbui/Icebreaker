import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import * as redisStore from 'cache-manager-redis-store';
import { UserService } from './user.service';
import { User } from './user.entity';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserController } from './user.controller';
import { SessionModule } from '../session/session.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => SessionModule),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
    }),
    CacheModule.register({
      store: redisStore as any,
      url: process.env.REDIS_TLS_URL,
      tls: process.env.REDIS_TLS === 'true' && {
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
      },
      connect_timeout: 15000,
    }),
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}

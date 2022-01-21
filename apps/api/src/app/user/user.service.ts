import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { Cache } from 'cache-manager';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user';
import { v4 } from 'uuid';
import { Tokens } from '../types/Tokens';
import { SessionService } from '../session/session.service';
import { Session, User as IUser } from '@icebreaker/shared-types';

export interface IPayload {
  id: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private sessionService: SessionService,
    private readonly connection: Connection,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}
  async create(data: CreateUserDto): Promise<void | Tokens & IUser> {
    const session = await this.sessionService.findByCode(data.code);

    if (await this.doesUserExist(data.name, session)) {
      throw new Error(`Player ${data.name} already exists in the room.`)
    }
    const newUser = this.userRepository.create({ name: data.name });
    await this.userRepository.save(newUser);

    try {
      await this.connection
        .createQueryBuilder()
        .relation(User, "session")
        .of(newUser)
        .set(session);

    } catch (err) {
      console.error(err);
      throw err;
    }

    const payload = await this.createPayload(newUser);
  
    return {
      id: newUser.id,
      name: newUser.name,
      access_token: await this.createAccessToken(payload),
      refresh_token: await this.createRefreshToken(newUser),
    };
  }

  async doesUserExist(name: string, session: Session): Promise<boolean> {
    const user = await this.userRepository.findOne({name: name, session: session})
    return user ? true : false;
  }

  // findAll(options?: FindManyOptions<User>): Promise<User[]> {
  //   return this.userRepository.find(options);
  // }

  // async getProfile(id: string): Promise<Omit<User, "email" | "password" | "refresh_tokens">>{
  //   const { email, password, refresh_tokens, ...rest } = await createQueryBuilder(User)
  //     .leftJoinAndSelect("User.memes", "Meme")
  //     .where("User.id = :id", { id: id })
  //     .getOne() as User;

  //   return rest;
  // }

  async findById(
    id: string,
    options?: FindOneOptions<User>
  ): Promise<User> {
    try {
      return this.userRepository.findOneOrFail(
        { id },
        options
      );
    } catch (err) {
      Logger.error(err);
      throw new NotFoundException('Cannot find user with id: ' + id);
    }
  }

  async remove(user: User): Promise<void> {
    await this.userRepository.delete(user.id);
  }

  async createPayload(user: User): Promise<IPayload> {
    return { id: user.id };
  }

  async createAccessToken(payload: IPayload): Promise<string> {
    return this.jwtService.sign(payload, { expiresIn: '1h' });
  }

  async createRefreshToken(user: User): Promise<string> {
    const token = v4();

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      user.refresh_tokens.push(token);
      await this.cacheManager.set('token:' + token, user, { ttl: 0 });
      await this.userRepository.save(user);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return token;
  }

  async refreshToken(refresh_token: string): Promise<string> {
    const data = await this.cacheManager.get<User>('token:' + refresh_token);
    if (!data) throw new UnauthorizedException();
    return this.createAccessToken(await this.createPayload(data));
  }
}

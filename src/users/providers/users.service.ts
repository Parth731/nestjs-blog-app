import {
  BadRequestException,
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { UserCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { GoogleUser } from '../interfaces/google-user.interface';

/**
 * class to connect users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * the method to get all the users from the database
   */
  constructor(
    /**
     * injecting usersRepository
     */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    /**
     * Inject userCreateManyProvider
     */
    private readonly userCreateManyProvider: UserCreateManyProvider,

    /**
     * inject createUserProvider
     */
    private readonly createUserProvider: CreateUserProvider,

    /**
     * inject findOneUserByEmailProvider
     */
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    /**
     * inject findOneByGoogleIdProvider
     */
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
    /**
     * inject createGoogleUserProvider
     */
    private readonly createGoogleUserProvider: CreateGoogleUserProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    return this.createUserProvider.createUser(createUserDto);
  }

  /**
   * find all posts by isAuthenticated user
   */
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    offset: number,
  ) {
    // console.log(this.profileConfiguration);
    // console.log(this.profileConfiguration.apiKey);

    // return [
    //   {
    //     firstName: 'John',
    //     email: 'john@doe.com',
    //   },
    //   {
    //     firstName: 'Jane',
    //     email: 'jane@doe.com',
    //   },
    // ];

    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The Api endpoint does not exist',
        fileName: 'users.service.ts',
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: 'Occured beacuse the API endpoint was permanetly moved',
      },
    );
  }
  /**
   * find a single user using the ID of user
   */
  public async findOneById(id: number) {
    let user = undefined;
    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description:
            'Error connecting to the database or when find user By Id',
        },
      );
    }

    /**
     * Handle the user does not exist
     */
    if (!user) {
      throw new BadRequestException('The user id does not exist', {
        description: 'Bad Request',
      });
    }

    return user;
  }

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    return await this.userCreateManyProvider.createMany(createManyUsersDto);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }

  public async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }

  public async createGoogleUser(googleUser: GoogleUser) {
    return await this.createGoogleUserProvider.createGoogleUser(googleUser);
  }
}

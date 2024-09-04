import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    /**
     * injecting usersRepository
     *  */
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    /**
     * injecting hashingProvider
     */
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    /**
     * inject mailservice
     */
    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser = undefined;

    try {
      //check is user exists with same email
      existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    //Handle exception
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email',
        {
          description: 'Bad Request',
        },
      );
    }

    //create a new User
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description:
            'Error connecting to the database or when creating new user',
        },
      );
    }

    try {
      await this.mailService.sendUserWelcomeEmail(newUser);
    } catch (error) {
      console.log('email not send something went wrong');
      throw new RequestTimeoutException(error);
    }
    return newUser;
  }
}

import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  public async findOneUserByEmail(email: string) {
    let user: User | undefined = undefined;
    try {
      //null if user does not exist
      user = await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Could not fetch user from database',
      });
    }

    if (!user) {
      throw new UnauthorizedException('user does not exist', {
        description: 'Unauthorized',
      });
    }

    return user;
  }
}

import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UserCreateManyProvider {
  constructor(
    /**
     * inject datasource
     */
    private readonly datasource: DataSource,
  ) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    let newUsers: User[] = [];
    //create query runner instance
    const queryRunner = this.datasource.createQueryRunner();
    try {
      //connect query runner to datasource
      await queryRunner.connect();
      //start transaction
      await queryRunner.startTransaction();
    } catch (error) {
      throw new RequestTimeoutException('Could not connect to the databse', {
        description: 'when connect to transaction',
      });
    }

    try {
      for (let user of createManyUsersDto.users) {
        let newUser = queryRunner.manager.create(User, user);
        let result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      //if successful commit
      await queryRunner.commitTransaction();
    } catch (error) {
      //if unsuccessful rollback
      await queryRunner.rollbackTransaction();
      throw new ConflictException('could not complete the transaction', {
        description: String(error),
      });
    } finally {
      try {
        //release connection
        await queryRunner.release();
      } catch (error) {
        throw new RequestTimeoutException('could not release the connection', {
          description: String(error),
        });
      }
    }
    return newUsers;
  }
}

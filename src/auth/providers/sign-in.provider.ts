import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingProvider } from './hashing.provider';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { ActiveUserData } from '../interfaces/active-user-interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    /**
     * inject usersService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**
     * inject hashingProvider
     */
    private readonly hashingProvider: HashingProvider,

    /**
     * inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}
  public async signin(signInDto: SignInDto) {
    //find the user using email id
    //throw an exception if the user is not found
    let user = await this.userService.findOneByEmail(signInDto.email);
    //compare password to the hash
    let isEqual: boolean = false;
    try {
      isEqual = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'could not compare password',
      });
    }

    if (!isEqual) {
      throw new UnauthorizedException('incorrect password', {
        description: 'Unauthorized',
      });
    }

    return await this.generateTokensProvider.generateTokens(user);
  }
}

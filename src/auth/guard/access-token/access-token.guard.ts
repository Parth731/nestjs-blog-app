import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    /**
     * inject jwtService
     */
    private readonly jwtService: JwtService,
    /**
     * inject jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //extract the request from exceution context
    const request = context.switchToHttp().getRequest();
    //extract the token from header
    const token = this.extractTokenFromHeader(request);
    //validate the token
    if (!token) {
      throw new UnauthorizedException('No token provided', {
        description: 'Unauthorized',
      });
    }

    try {
      const payload = await this.jwtService.verifyAsync(
        token,
        this.jwtConfiguration,
      );

      //attach the payload to the request
      request[REQUEST_USER_KEY] = payload;
    } catch (error) {
      throw new UnauthorizedException(error, {
        description: 'Unauthorized',
      });
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    // return type === 'Bearer' ? token : undefined;
    return token;
  }
}

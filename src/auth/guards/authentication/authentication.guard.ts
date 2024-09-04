import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';
import { AuthType } from 'src/auth/enum/authType.enum';
import { AccessTokenGuard } from 'src/auth/guard/access-token/access-token.guard';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardmap: Record<
    AuthType,
    CanActivate | CanActivate[]
  > = {
    [AuthType.Bearer]: this.accessTokenGuard,
    [AuthType.None]: {
      canActivate: () => true,
    },
  };

  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    //authTypes from reflector
    const authTypes = this.reflector.getAllAndOverride<AuthType[]>(
      AUTH_TYPE_KEY,
      [context.getHandler(), context.getClass()],
    ) ?? [AuthenticationGuard.defaultAuthType];

    //array of guards
    const guards = authTypes.map((type) => this.authTypeGuardmap[type]).flat();

    //default error
    const error = new UnauthorizedException();

    //loop guards canActivate if true request is process, if false request is not processed
    for (const instance of guards) {
      console.log(instance);
      const canActivate = await Promise.resolve(
        instance.canActivate(context),
      ).catch((error) => {
        error: error;
      });

      if (canActivate) {
        return true;
      }
    }

    throw error;
  }
}

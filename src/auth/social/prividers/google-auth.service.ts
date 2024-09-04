import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../Dtos/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    /**
     *
     * inject userService
     */
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    /**
     * inject  jwtConfiguration
     */
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    /**
     * inject generateTokensProvider
     */
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    this.oauthClient = new OAuth2Client({
      clientId: this.jwtConfiguration.googleClientId,
      clientSecret: this.jwtConfiguration.googleClientSecret,
    });
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      //verify the google token send by the user
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
        //   audience: this.jwtConfiguration.googleClientId,
      });
      console.log(loginTicket);
      //extract the payload from google jwt token
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = loginTicket.getPayload();
      // find the user in the database using the google Id
      const user = await this.userService.findOneByGoogleId(googleId);
      // if googleId exists generate tokens
      if (user) {
        return this.generateTokensProvider.generateTokens(user);
      }
      // if not create a new user and generate tokens
      const newUser = await this.userService.createGoogleUser({
        email,
        firstName,
        lastName,
        googleId,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      // throw unauthorized exception if the user does not exist
      throw new UnauthorizedException(error);
    }
  }
}

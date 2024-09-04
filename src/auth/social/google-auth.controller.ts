import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './prividers/google-auth.service';
import { GoogleTokenDto } from './Dtos/google-token.dto';
import { Auth } from '../decoarators/auth.decorator';
import { AuthType } from '../enum/authType.enum';

@Auth(AuthType.None)
@Controller('auth/google-auth')
export class GoogleAuthController {
  constructor(
    /**
     * inject googleAuthService
     */
    private readonly googleAuthService: GoogleAuthService,
  ) {}

  @Post()
  public authenticate(@Body() googleTokenDto: GoogleTokenDto) {
    return this.googleAuthService.authenticate(googleTokenDto);
  }
}

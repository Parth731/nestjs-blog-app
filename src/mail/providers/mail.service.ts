import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserWelcomeEmail(user: User): Promise<void> {
    console.log(user);
    await this.mailerService.sendMail({
      to: user.email,
      from: 'onboarding  team <support@nestjs-blog.com>',
      subject: 'Welcome to NestJS Blog',
      template: './welcome',
      context: {
        name: user.firstName,
        email: user.email,
        loginUrl: 'http://localhost:5000',
      },
    });
  }
}

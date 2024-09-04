import { Global, Module } from '@nestjs/common';
import { MailService } from './providers/mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';

@Global()
// transport: {
//   host: 'sandbox.smtp.mailtrap.io',
//   port: 2525,
//   auth: {
//     user: '5146b455a2bef6',
//     pass: 'd8e719e3618e4e',
//   },
// },
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('appConfig.mailHost'),
          secure: false,
          port: 2525,
          auth: {
            user: configService.get('appConfig.smtpUsername'),
            pass: configService.get('appConfig.smtpPassword'),
          },
        },
        defaults: {
          from: `My Blog <no-reply@nestjs-blog.com>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new EjsAdapter({ inlineCssEnabled: true }),
          options: {
            strict: false,
          },
        },
      }),
    }),
    // MailerModule.forRoot({
    //   transport: {
    //     host: 'sandbox.smtp.mailtrap.io',
    //     port: 2525,
    //     auth: {
    //       user: '5146b455a2bef6',
    //       pass: 'd8e719e3618e4e',
    //     },
    //   },
    // }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}

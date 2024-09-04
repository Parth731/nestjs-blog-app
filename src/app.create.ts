import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';

export function appCreate(app: INestApplication): void {
  /**
   * use vlidation pipe globally
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove extra fields
      forbidNonWhitelisted: true, // throw error if extra fields are present
      transform: true, // convert string to number
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  /**
   * swagger configation
   */
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS MasterClass - Blog App API')
    .setDescription('Use The base API URL as http://localhost:5000/blog/api/v1')
    .setTermsOfService('http://localhost:5000/terms-of-service')
    .setLicense(
      'MIT License',
      'https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt',
    )
    .addServer('http://localhost:5000')
    .setVersion('1.0')
    .build();
  //instantiate swagger module
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  //add swagger module
  SwaggerModule.setup('/blog/api/v1', app, document);

  //setup the aws sdk used uploading the files to aws s3 bucket
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId'),
      secretAccessKey: configService.get('appConfig.awsSecretAccessKey'),
    },
    region: configService.get('appConfig.awsRegion'),
  });

  //enable cros origin
  app.enableCors();
}

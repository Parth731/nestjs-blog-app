import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(96)
  email: string;

  @IsString()
  @IsNotEmpty()
  //   @IsStrongPassword()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])/, {
    message:
      'Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character',
  })
  password: string;
}

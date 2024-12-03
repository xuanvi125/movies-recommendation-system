import { IsEmail, isNotEmpty, MinLength } from 'class-validator';

export class LoginDTO {
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
}

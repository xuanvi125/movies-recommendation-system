import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @MinLength(6)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

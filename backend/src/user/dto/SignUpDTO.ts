import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class SignUpDTO {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @MinLength(6)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}

import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { BadCredentialException } from 'src/exceptions/BadCredentialException';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginInDto: LoginDTO) {
    try {
      const response = await this.authService.logIn(loginInDto);
      return response;
    } catch (error) {
      if (error instanceof BadCredentialException)
        throw new BadRequestException('Invalid email or password');
      throw error;
    }
  }
}

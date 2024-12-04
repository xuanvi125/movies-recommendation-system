import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto/LoginDTO';
import { BadCredentialException } from 'src/exceptions/BadCredentialException';
import { GoogleAuthGuard } from 'src/common/guards/google.guard';

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

    @Get('google/login')
    @UseGuards(GoogleAuthGuard)
    async googleLogin() {
    }

    @Get('google/callback')
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req: any, @Res() res: any) {
        if (!req.user) 
            return;
        const CLIENT_URL = process.env.CLIENT_REDIRECT_URL;
        const token = req.user.accessToken;
        res.redirect(`${CLIENT_URL}?token=${token}`);
    }
}

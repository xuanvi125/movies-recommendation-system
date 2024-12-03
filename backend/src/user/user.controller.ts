import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SignUpDTO } from './dto/SignUpDTO';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { User } from './schemas/user.schema';
import { Request } from 'express';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() signUpDTO: SignUpDTO) {
    const user = await this.userService.create(signUpDTO);
    if (!user) {
      return {
        statusCode: 400,
        error: 'Bad Request',
        message: 'Email already exists',
      };
    }
    return {
      statusCode: 201,
      message: 'User created successfully',
      data: user,
    };
  }
  @Get('profile')
  @UseGuards(AuthGuard)
  async getProfile(@Req() request: Request) {
    const user = request['user'];
    const profile = await this.userService.getProfile(user.sub);
    return {
      statusCode: 200,
      user: profile,
    };
  }
}

import {
  BadRequestException,
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
import EmailAlreadyExistsException from 'src/exceptions/EmailAlreadyExistsException';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async create(@Body() signUpDTO: SignUpDTO) {
    try {
      const user = await this.userService.create(signUpDTO);
      return {
        statusCode: 201,
        message: 'User created successfully',
        data: user,
      };
    } catch (err) {
      if (err instanceof EmailAlreadyExistsException) {
        throw new BadRequestException('Email already exists');
      }
    }
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

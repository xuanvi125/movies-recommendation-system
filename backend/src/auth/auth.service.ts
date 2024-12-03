import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/LoginDTO';
import * as bcrypt from 'bcrypt';
import { BadCredentialException } from 'src/exceptions/BadCredentialException';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async logIn(
    loginDTO: LoginDTO,
  ): Promise<{ access_token: string; user: User }> {
    const { email, password } = loginDTO;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new BadCredentialException();
    }
    const payload = { sub: user.email };
    const token = await this.jwtService.signAsync(payload);
    user.password = undefined;
    return {
      access_token: token,
      user,
    };
  }
}

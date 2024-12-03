import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDTO } from './dto/SignUpDTO';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
  ) {}

  async create(signUpDTO: SignUpDTO): Promise<any> {
    const { email, password } = signUpDTO;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      return null;
    }

    signUpDTO.password = await hash(password, 12);
    const user = new this.userModel(signUpDTO);
    await user.save();
    user.password = undefined;
    return user;
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).select('+password');
  }
  async getProfile(email: String) {
    return await this.userModel.findOne({ email });
  }
}

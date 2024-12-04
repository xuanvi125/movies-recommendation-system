import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignUpDTO } from './dto/SignUpDTO';
import { hash } from 'bcrypt';
import EmailAlreadyExistsException from 'src/exceptions/EmailAlreadyExistsException';

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
      throw new EmailAlreadyExistsException();
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

  async createGoogleUser(email: string, name: string, googleId: String) {
    const existingUser = await this.userModel.findOne({email});
    if (existingUser) {
      throw new EmailAlreadyExistsException();
    }
    const newUser = {
      email,
      name,
      googleId
    };

    const user = new this.userModel(newUser);
    await user.save();
    user.password = undefined;
    return user;
  }
}

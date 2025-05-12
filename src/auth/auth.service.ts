import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDTO } from './dto/LoginDto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { error } from 'console';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JWTstrategy } from './strategy/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly CreatedUser: Model<User>,
    private readonly jwtservice: JwtService,
  ) {}

  async create(createUser: CreateUserDto) {
    try {
      const { password, ...userData } = createUser;

      const User = new this.CreatedUser({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await User.save();
      return {
        email: User.email,
        password: User.password,
        _id: User._id,
        __v: User.__v,
        token: this.getJWTtoken({ email: User.email }),
      };
    } catch (error) {
      console.log(error);
    }
  }

  async login(login: LoginDTO) {
    const { password, email } = login;

    const user = await this.CreatedUser.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('Credentials are not valid (email)');
    }

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credentials are not valid (password)');
    }

    return {
      email: user.email,
      password: user.password,
      _id: user._id,
      __v: user.__v,
      token: this.getJWTtoken({ email: user.email }),
    };
  }

  checkAuthStatus(user: User) {
    return {
      user: user,
      token: this.getJWTtoken({ email: user.email }),
    };
  }

  private getJWTtoken(payload: JwtPayload) {
    const token = this.jwtservice.sign(payload);

    return token;
  }
}

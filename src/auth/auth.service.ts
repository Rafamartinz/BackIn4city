import { JwtPayload } from './../../node_modules/@types/jsonwebtoken/index.d';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDTO } from './dto/LoginDto';
import { User } from './entities/auth.entity';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly CreatedUser: Model<User>,
    private readonly jwtservice: JwtService,
  ) {}

  //Registro
  async create(createUser: CreateUserDto) {
    try {
      const { password, ...userData } = createUser;

      //Creo el user con los valores y al contraseña hasheada
      const User = new this.CreatedUser({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      //Guardamos y retornamos info
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

  //Inicio de sesion
  async login(login: LoginDTO) {
    const { password, email } = login;

    //Busco el usuario
    const user = await this.CreatedUser.findOne({ email }).select('+password');

    if (!user) {
      throw new UnauthorizedException('Credenciales invalidas (email)');
    }
    //Comparo la contraseña hasheada con la escrita
    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Credencianes invalidas(password)');
    }

    return {
      email: user.email,
      password: user.password,
      _id: user._id,
      __v: user.__v,
      token: this.getJWTtoken({ email: user.email }),
    };
  }

  //Necesario para Los guards en el front
  checkAuthStatus(user: User) {
    return {
      user: user,
      token: this.getJWTtoken({ email: user.email }),
    };
  }

  //genera el JWT
  private getJWTtoken(payload: JwtPayload) {
    const token = this.jwtservice.sign(payload);

    return token;
  }
}

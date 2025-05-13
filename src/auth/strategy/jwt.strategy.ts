import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../entities/auth.entity';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JWTInterface } from './interfaces/jwt.strategy.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JWTstrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name)
    private readonly userRepository: Model<User>,
    configService: ConfigService,
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JWTInterface): Promise<User> {
    const { email } = payload;

    const user = await this.userRepository.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('This token is not valid');
    }

    return user;
  }
}

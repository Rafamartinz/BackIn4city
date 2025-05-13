import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginDTO } from './dto/LoginDto';
import { get } from 'mongoose';
import { User } from './entities/auth.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return await this.authService.create(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDTO) {
    return await this.authService.login(loginDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('check-status')
  checkStatus(@Req() req) {
    return this.authService.checkAuthStatus(req.user);
  }
}

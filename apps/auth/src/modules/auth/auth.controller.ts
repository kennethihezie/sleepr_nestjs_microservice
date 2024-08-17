import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/model/schema/user.schema';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup() {
    
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Body() dto: LoginDto, @CurrentUser() user: User, @Res({ passthrough: true }) response: Response){
    return await this.authService.login(user, response)
  }
}

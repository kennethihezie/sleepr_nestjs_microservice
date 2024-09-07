import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/model/dto/create-user.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() payload: CreateUserDto) {
     return await this.authService.signUp(payload)
  }

  @Post('/login')
  async login(@Body() payload: LoginDto){
    return await this.authService.login(payload)
  }
}

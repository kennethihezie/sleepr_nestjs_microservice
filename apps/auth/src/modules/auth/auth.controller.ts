import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/model/dto/create-user.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AUTHENTICATE_ROUTE } from '@app/common/shared/constants/services';
import { MicroserviceGuard } from './guards/microservice.guard';


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

  @UseGuards(MicroserviceGuard)
  @MessagePattern(AUTHENTICATE_ROUTE)
  async authenticate(@Payload() data: any) {
    console.log(data);
    
   }
}

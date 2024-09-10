import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AppJwtService } from './jwt.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/model/dto/create-user.dto';
import { User } from '../users/model/schema/user.schema';

@Injectable()
export class AuthService { 
    constructor(private readonly appJwtService: AppJwtService, private readonly userService: UsersService) {}
 
    async signUp(payload: CreateUserDto): Promise<User> {
        const user = await this.userService.createUser(payload)
        return user
    }

    async login(payload: LoginDto): Promise<User> {        
       const existingUser = await this.userService.validateUser(payload)

       const accessToken = await this.appJwtService.generateJwtToken({ sub: existingUser._id as unknown as string, email: existingUser.email })
       const refreshToken = await this.appJwtService.generateRefreshToken({ sub: existingUser._id as unknown as string })

       const user = await this.userService.updateUser(existingUser._id as string, { token: { accessToken, refreshToken } })

       return user
    }
}

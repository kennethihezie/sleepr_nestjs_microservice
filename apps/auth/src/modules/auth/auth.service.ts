import { Injectable } from '@nestjs/common';
import { User } from '../users/model/schema/user.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { config } from '../../config/configuration';

@Injectable()
export class AuthService { 
    constructor(private readonly jwtService: JwtService) {}

    async login(user: User, response: Response) {
       const tokenPayload = {
        userId: user._id.toString()
       }

       const expires = new Date()
       expires.setSeconds(expires.getSeconds() + config.jwt.expiresIn)

       const token = await this.jwtService.signAsync(tokenPayload)

       // Set the token on the cookie for security
       response.cookie('Authentication', token, {
        httpOnly: true,
        expires
       })

       response.send(user)
    }
}

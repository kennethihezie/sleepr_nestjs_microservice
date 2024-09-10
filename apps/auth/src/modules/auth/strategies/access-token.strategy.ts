import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "../../users/users.service";
import { config } from "apps/auth/src/config/configuration";
import { Request } from "express";
import { JwtPayload } from "../types/jwt-payload.type";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly userService: UsersService) {
    super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: config.jwt.jwtSecret,
        passReqToCallback: true
    })
  }


  async validate(req: Request, payload: JwtPayload) {    
    const { sub } = payload

    const user = await this.userService.getUser(sub)

    if(!user) {
        throw new UnauthorizedException('User not found');
    }

    const token = req.get('Authorization').replace('Bearer', '').trim()

    if (user.token.accessToken !== token) {
        throw new UnauthorizedException('Invalid or expired token');
    }
    
          
    return user
  }
}
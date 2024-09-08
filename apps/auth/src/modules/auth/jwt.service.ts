import { Injectable } from "@nestjs/common";
import { JwtPayload } from "./types/jwt-payload.type";
import { JwtService } from "@nestjs/jwt";
import { config } from "../../config/configuration";

@Injectable()
export class AppJwtService {
   constructor(private readonly service: JwtService) {}
   
    async generateJwtToken(payload: JwtPayload) {        
       const accessToken = await this.service.signAsync(payload, { secret: config.jwt.jwtSecret, expiresIn: config.jwt.jwtExpiresIn })
       return accessToken
    }

    async generateRefreshToken(payload: Partial<JwtPayload>) {
        const refreshToken = await this.service.signAsync(payload, { secret: config.jwt.jwtRefreshSecret, expiresIn: config.jwt.jwtRefreshExpiresIn })
        return refreshToken
    }

    async verifyJwtToken(token: string): Promise<JwtPayload> {
        const data = await this.service.verifyAsync<JwtPayload>(token, { secret:config.jwt.jwtSecret })
        return data
    }

    async verifyRefreshToken(token: string): Promise<JwtPayload> {
        const data = await this.service.verifyAsync<JwtPayload>(token, { secret:config.jwt.jwtRefreshSecret })
        return data
    }
}
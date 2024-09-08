import { CanActivate, ExecutionContext, Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { Request } from "express";
import { AUTH_SERVICE, AUTHENTICATE_ROUTE } from "@app/common/shared/constants/services";
import { ClientProxy } from "@nestjs/microservices";
import { UserDto } from "../dto/user.dto";


@Injectable()
export class JwtAuthGuard implements CanActivate {
    /* The ClientProxy allows us to communicate with other microservices */
   constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

    canActivate(context: ExecutionContext): boolean | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const AUTH_TOKEN  = this.extractTokenFromHeader(request)
        if(!AUTH_TOKEN){
            return false
        }        

        /* Send the request to the auth microservice */
        return this.client.send<UserDto>(AUTHENTICATE_ROUTE, {
            AUTH_TOKEN
        }).pipe(
            /* The tap operator help us execute a side effect. The res is the user returned from the auth service */
            tap((res) => { context.switchToHttp().getRequest().user = res }),
            map(() => true)
        )
    }

    private extractTokenFromHeader(request: Request): string | undefined {        
        const [type, token] = request.headers.authorization?.split(' ') ?? []
        return type === 'Bearer' ? token : undefined
    }
}
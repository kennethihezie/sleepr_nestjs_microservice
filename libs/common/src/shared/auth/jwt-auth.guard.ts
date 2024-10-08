import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Request } from 'express';
import {
  AUTH_SERVICE,
  AUTHENTICATE_ROUTE,
} from '@app/common/shared/constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  /* The ClientProxy allows us to communicate with other microservices */
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      return false;
    }


    return this.client.send<UserDto>(AUTHENTICATE_ROUTE, { token }).pipe(
      // Tap allows performing side-effects without altering the emitted data.
      tap((user: UserDto) => {
          // Ensure the user data is retrieved correctly
          if (user) {
              const rpcContext = context.switchToRpc().getContext();
              const httpRequest = context.switchToHttp().getRequest();
              
              // Set the user in the HTTP request context for subsequent handlers
              httpRequest.user = user;
  
              // Optionally, you can log the user if needed
              console.log('Authenticated user:', user);
          } else {
              console.warn('User authentication failed.');
          }
      }),
      // Map to true to indicate successful authentication if the user is retrieved
      map((user: UserDto) => !!user),
      // Catch errors if needed
      catchError((err) => {
          console.error('Error during authentication:', err);
          return of(false); // Return false in case of an error
      })
  );
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

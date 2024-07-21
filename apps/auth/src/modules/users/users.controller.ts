import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './model/dto/create-user.dto';
import { ResponseMessage } from '@app/common/shared/decorators/response_message.decorator';


@Controller('users')
export class UsersController {
    constructor(private readonly service: UsersService) {}

    @Post()
    @ResponseMessage('User Created')
    async createUser(@Body() dto: CreateUserDto) {
      return await this.service.createUser(dto)
    }
}

import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './model/dto/create-user.dto';
import { User } from './model/schema/user.schema';

@Injectable()
export class UsersService {
    constructor(private readonly repository: UserRepository) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.repository.create(dto)
    }
}

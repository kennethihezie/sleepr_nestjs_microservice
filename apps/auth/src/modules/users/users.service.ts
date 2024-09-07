import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './model/dto/create-user.dto';
import { User } from './model/schema/user.schema';
import * as bcrypt from 'bcryptjs'
import { LoginDto } from '../auth/dto/login.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(private readonly repository: UserRepository) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        return this.repository.create({
            ...dto,
            password: await bcrypt.hash(dto.password, 10)
        } as User)
    }

    async validateUser({ email, password }: LoginDto): Promise<User> {
        const user = await this.repository.findOne({ email })
        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch){
            throw new UnauthorizedException('Invalid username or password')
        }

        return user
    }

    async getUser(id: string): Promise<User> {
        return await this.repository.findOne({ id })
    }


    async updateUser(id: string, payload: UpdateUserDto): Promise<User> {
        const user = await this.repository.findOneAndUpdate({ id }, payload)
        return user
    }
}

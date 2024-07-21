import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { DatabaseModule } from '@app/common/modules';
import { User, UserSchema } from './model/schema/user.schema';
import { UserRepository } from './user.repository';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  imports: [DatabaseModule, DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }])]
})
export class UsersModule { }

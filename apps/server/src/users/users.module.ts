import { Module } from '@nestjs/common';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../app/typeorm/entities/User";
import {Role} from "../app/typeorm/entities/Role";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

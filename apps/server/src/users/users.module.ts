import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../app/typeorm/entities/User";
import {Role} from "../app/typeorm/entities/Role";
import {Schedule} from "../app/typeorm/entities/Schedule";

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Schedule])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}

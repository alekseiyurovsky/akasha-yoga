import { Module } from '@nestjs/common';
import { UsersController } from './controller/users.controller';
import { UsersService } from './services/users.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../app/typeorm/entities/User";
import {Role} from "../app/typeorm/entities/Role";
import {Schedule} from "../app/typeorm/entities/Schedule";
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [
      TypeOrmModule.forFeature([User, Role, Schedule])
  ],
  controllers: [UsersController],
  providers: [UsersService, JwtService]
})
export class UsersModule {}

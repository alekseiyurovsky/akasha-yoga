import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Schedule} from '../app/typeorm/entities/Schedule';
import {Training} from '../app/typeorm/entities/Training';
import {User} from '../app/typeorm/entities/User';
import {UsersService} from '../users/services/users.service';
import {SchedulesController} from './controllers/schedules.controller';
import {SchedulesService} from './services/schedules.service';
import {JwtService} from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([User, Training, Schedule])],
  controllers: [SchedulesController],
  providers: [SchedulesService, UsersService, JwtService]
})
export class SchedulesModule {}

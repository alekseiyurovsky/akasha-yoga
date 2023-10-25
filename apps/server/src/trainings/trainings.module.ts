import {HttpModule} from '@nestjs/axios';
import {Module} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Training} from '../app/typeorm/entities/Training';
import {User} from '../app/typeorm/entities/User';
import {TrainingsController} from './controllers/trainings.controller';
import {TrainingsService} from './services/trainings.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Training]),
    HttpModule
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService, JwtService]
})
export class TrainingsModule {}

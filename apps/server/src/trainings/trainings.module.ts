import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Training} from '../app/typeorm/entities/Training';
import {User} from '../app/typeorm/entities/User';
import {TrainingsController} from './controllers/trainings.controller';
import {TrainingsService} from './services/trainings.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Training])],
  controllers: [TrainingsController],
  providers: [TrainingsService]
})
export class TrainingsModule {}

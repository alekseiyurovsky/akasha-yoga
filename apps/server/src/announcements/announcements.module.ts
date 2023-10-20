import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Announcement} from '../app/typeorm/entities/Announcement';
import {User} from '../app/typeorm/entities/User';
import { AnnouncementsController } from './controllers/announcements.controller';
import { AnnouncementsService } from './services/announcements.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Announcement])],
  controllers: [AnnouncementsController],
  providers: [AnnouncementsService]
})
export class AnnouncementsModule {}

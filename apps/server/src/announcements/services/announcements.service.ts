import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Announcement} from '../../app/typeorm/entities/Announcement';
import {CreateAnnouncementDto} from '../dtos/CreateAnnouncement.dto';
import {PatchAnnouncementDto} from '../dtos/PatchAnnouncement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(@InjectRepository(Announcement) private announcementRepository: Repository<Announcement>) {}

  public findAnnouncements() {
    return this.announcementRepository.find({
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      order: {priority: 'DESC'},
      relations: ['author']
    });
  }

  public findOne(id: number): Promise<Announcement> {
    return this.announcementRepository.findOne({
      where: {id},
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      relations: ['author']
    });
  }

  public createAnnouncement(announcementDetails: CreateAnnouncementDto) {
    const announcement = this.announcementRepository.create({
      ...announcementDetails,
      date_added: new Date().toUTCString()
    });
    return this.announcementRepository.save(announcement);
  }

  public updateAnnouncement(id: number, patchAnnouncementDetails: Partial<PatchAnnouncementDto>) {
    return this.announcementRepository.update({id}, {...patchAnnouncementDetails});
  }
}

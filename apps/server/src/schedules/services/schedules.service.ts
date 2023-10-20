import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Schedule} from '../../app/typeorm/entities/Schedule';
import {UsersService} from '../../users/services/users.service';
import {CreateScheduleDto} from '../dtos/CreateSchedule.dto';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
    private userService: UsersService
  ) {}

  public async findSchedules() {
    const schedules = await this.scheduleRepository.find({
      select: {
        author: {
          name: true,
          surname: true
        },
        training: {
          max_count: true,
          name: true,
          id: true
        }
      },
      relations: ['author', 'training']
    });

    return schedules;
  }

  public async findOne(id: number) {
    console.log('hiiii');
    const {approved_entrants, unapproved_entrants, ...schedule} = await this.scheduleRepository.findOne({
      where: {id},
      select: {
        author: {
          name: true,
          surname: true
        },
        training: {
          max_count: true,
          name: true,
          id: true
        }
      },
      relations: ['author', 'training']
    });

    let approved;
    let unapproved;
    if (approved_entrants.length > 2) {
      approved = await this.userService.findMany(JSON.parse(approved_entrants));
    }

    if (unapproved_entrants.length > 2) {
      unapproved = await this.userService.findMany(JSON.parse(unapproved_entrants));
    }

    return {schedule, approved, unapproved};
  }

  public createSchedule(scheduleDetails: CreateScheduleDto) {
    return this.scheduleRepository.save(scheduleDetails);
  }

  public async updateSchedule(id: number, {unapproved_entrants, approved_entrants, ...otherDetails}: any) {
    let details: any = {};
    if (unapproved_entrants) {
      details.unapproved_entrants = JSON.stringify(unapproved_entrants)
    }
    if (approved_entrants) {
      details.approved_entrants = JSON.stringify(approved_entrants)
    }
    return this.scheduleRepository.update({id}, {...otherDetails, ...details});
  }
}

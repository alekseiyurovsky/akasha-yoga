import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Schedule} from '../../app/typeorm/entities/Schedule';
import {UsersService} from '../../users/services/users.service';
import {CreateScheduleDto} from '../dtos/CreateSchedule.dto';
import {PatchScheduleDto} from "../dtos/PatchSchedule.dto";
import {FindOneOptions} from "typeorm/find-options/FindOneOptions";

const EMPTY_ENTRANTS = '[]';

@Injectable()
export class SchedulesService {

    private readonly scheduleSelectOptions: FindOneOptions<Schedule> = {
        select: {
            author: {
                name: true,
                surname: true
            },
            training: {
                max_count: true,
                duration: true,
                image_url: true,
                name: true,
                id: true
            }
        },
        relations: ['author', 'training']
    };

    constructor(
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>,
        private userService: UsersService
    ) {
    }

    public async findSchedules() {
        const schedules = await this.scheduleRepository.find(this.scheduleSelectOptions);
        return await Promise.all(schedules.map(async schedule => await this.getUsersFromSchedule(schedule)));
    }

    public async findOne(id: number) {
        const schedule = await this.scheduleRepository.findOne({
            where: {id},
            ...this.scheduleSelectOptions
        });

        return this.getUsersFromSchedule(schedule);
    }

    private async getUsersFromSchedule({approved_entrants, unapproved_entrants, ...schedule}: Schedule) {
        let approved, unapproved = [];
        if (approved_entrants as unknown as number[]) {
            approved = await this.userService.findMany(approved_entrants as unknown as number[]);
        }
        if (unapproved_entrants as unknown as number[]) {
            unapproved = await this.userService.findMany(unapproved_entrants as unknown as number[]);
        }
        return {...schedule, approved, unapproved};
    }

    public createSchedule(scheduleDetails: CreateScheduleDto) {
        return this.scheduleRepository.save(scheduleDetails);
    }

    public deleteSchedule(id: number) {
        return this.scheduleRepository.delete({id});
    }

    public async updateSchedule(
        id: number,
        details: Partial<PatchScheduleDto>
    ) {
        // const details: { unapproved_entrants?: string, approved_entrants?: string } = {};
        // if (unapproved_entrants) {
        //     details.unapproved_entrants = JSON.stringify(unapproved_entrants)
        // }
        // if (approved_entrants) {
        //     details.approved_entrants = JSON.stringify(approved_entrants)
        // }
        return this.scheduleRepository.update({id}, details);
    }
}

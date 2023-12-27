import {Injectable, Logger} from '@nestjs/common';
import {User} from "../../app/typeorm/entities/User";
import {ArrayContains, Equal, In, MoreThan, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {PatchUserDetails} from "../utils/types";
import {Schedule} from "../../app/typeorm/entities/Schedule";
import * as bcrypt from 'bcrypt';
import {ArrayOverlap} from "typeorm/find-options/operator/ArrayOverlap";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Schedule) private scheduleRepository: Repository<Schedule>
    ) {
    }

    public findUsers() {
        return this.userRepository.find({relations: ['role']});
    }

    public findOne(id: number): Promise<User> {
        return this.userRepository.findOne({where: {id}, relations: ['role']});
    }

    public findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({where: {email}, relations: ['role']});
    }

    public async getUserSchedules(id: number) {
        const schedules = await this.scheduleRepository.find({
            where: [
                {
                    date: MoreThan(new Date()),
                    unapproved_entrants: ArrayOverlap([id])
                },
                {
                    date: MoreThan(new Date()),
                    approved_entrants: ArrayOverlap([id])
                }
            ],
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
        });

        return await Promise.all(schedules.map(async schedule => await this.getUsersFromSchedule(schedule)));
    }

    private async getUsersFromSchedule({approved_entrants, unapproved_entrants, ...schedule}: Schedule) {
        let approved, unapproved = [];
        if (approved_entrants as unknown as number[]) {
            approved = await this.findMany(approved_entrants as unknown as number[]);
        }
        if (unapproved_entrants as unknown as number[]) {
            unapproved = await this.findMany(unapproved_entrants as unknown as number[]);
        }
        return {...schedule, approved, unapproved};
    }

    public async getInstructorSchedules(id: number): Promise<Schedule[]> {
        return this.scheduleRepository.find({
            where: {
                author_id: Equal(id),
                date: MoreThan(new Date())
            }
        });
    }

    public findMany(ids: number[]): Promise<User[]> {
        return this.userRepository.find({
            where: {
                id: In(ids)
            },
            select: {
                id: true,
                name: true,
                surname: true
            }
        });
    }

    public async createUser(userDetails: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...userDetails,
            roleId: 1
        });
        const salt = await bcrypt.genSalt();
        const password_hash = await bcrypt.hash(newUser.password_hash, salt);
        return this.userRepository.save({...newUser, password_hash});
    }

    public async updateUser(id: number, patchUserDetails: PatchUserDetails) {
        await this.userRepository.update({id}, {...patchUserDetails});
        return this.findOne(id);
    }
}

import {Injectable} from '@nestjs/common';
import {User} from "../../app/typeorm/entities/User";
import {Equal, In, MoreThan, Repository} from 'typeorm';
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {PatchUserDetails} from "../utils/types";
import {Schedule} from "../../app/typeorm/entities/Schedule";
import * as bcrypt from 'bcrypt';

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

    public async getUserSchedules(id: number): Promise<Schedule[]> {
        const trainings = await this.scheduleRepository
            .createQueryBuilder('schedule')
            .where(`date > CURDATE() AND (JSON_CONTAINS(unapproved_entrants, "${id}") OR JSON_CONTAINS(approved_entrants, "${id}"))`)
            .getMany();
        return trainings;
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

    public updateUser(id: number, patchUserDetails: PatchUserDetails) {
        return this.userRepository.update({id}, {...patchUserDetails});
    }
}

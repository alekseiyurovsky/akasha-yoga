import {Injectable} from '@nestjs/common';
import {User} from "../../../app/typeorm/entities/User";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../../dtos/CreateUser.dto";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    public createUser(userDetails: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...userDetails,
            createdAt: new Date().toUTCString(),
        });
        return this.userRepository.save(newUser);
    }

}

import {Injectable} from '@nestjs/common';
import {User} from "../../app/typeorm/entities/User";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {PatchUserDetails} from "../utils/types";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    public findUsers() {
      return this.userRepository.find({ relations: ['role'] });
    }

    public findOne(id: number): Promise<User> {
      return this.userRepository.findOne({ where: { id }, relations: ['role'] });
    }

    public createUser(userDetails: CreateUserDto) {
        const newUser = this.userRepository.create({
            ...userDetails,
            roleId: 1,
            createdAt: new Date().toUTCString(),
        });
        return this.userRepository.save(newUser);
    }

    public updateUser(id: number, patchUserDetails: PatchUserDetails) {
        return this.userRepository.update({ id }, { ...patchUserDetails });
    }
}

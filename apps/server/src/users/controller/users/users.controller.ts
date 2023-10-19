import {Body, Controller, Post} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {CreateUserDto} from "../../dtos/CreateUser.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }
}

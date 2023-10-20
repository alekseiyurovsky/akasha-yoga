import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {PatchUserDetails} from '../utils/types';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Get()
    getUsers() {
      return this.userService.findUsers();
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() patchUserDto: PatchUserDetails,
    ) {
        await this.userService.updateUser(id, patchUserDto);
    }
}

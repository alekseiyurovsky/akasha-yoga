import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../services/users.service";
import {CreateUserDto} from "../dtos/CreateUser.dto";
import {PatchUserDetails} from '../utils/types';
import {JwtAuthGuard} from "../../auth/services/jwt-auth.guard";
import {JwtAdminAuthGuard} from "../../auth/services/jwt-admin-auth.guard";
import {UserAuthGuard} from "../../auth/services/user-auth.guard";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    getUsers() {
      return this.userService.findUsers();
    }

    @UseGuards(UserAuthGuard, JwtAuthGuard)
    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number) {
      return this.userService.findOne(id);
    }

    @UseGuards(UserAuthGuard, JwtAuthGuard)
    @Get(':id/schedules')
    getUserSchedules(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getUserSchedules(id);
    }

    @UseGuards(UserAuthGuard, JwtAdminAuthGuard)
    @Get(':id/instructor_schedules')
    getInstructorSchedules(@Param('id', ParseIntPipe) id: number) {
        return this.userService.getInstructorSchedules(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() patchUserDto: PatchUserDetails,
    ) {
        await this.userService.updateUser(id, patchUserDto);
    }
}

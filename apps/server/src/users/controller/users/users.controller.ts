import {Body, Controller, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {CreateUserDto} from "../../dtos/CreateUser.dto";
import {PatchUserDto} from "../../dtos/PatchUser.dto";

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.userService.createUser(createUserDto);
    }

    @Patch(':id')
    async updateUserById(
        @Param('id', ParseIntPipe) id: number,
        @Body() patchUserDto: PatchUserDto,
    ) {
        await this.userService.updateUser(id, patchUserDto);
    }
}

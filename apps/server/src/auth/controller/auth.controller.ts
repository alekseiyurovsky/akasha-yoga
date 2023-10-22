import {Body, Controller, Post, UseGuards} from '@nestjs/common';
import {UsersService} from "../../users/services/users.service";
import {CreateUserDto} from "../../users/dtos/CreateUser.dto";
import {AuthService} from "../services/auth.service";
import {SignInUserDto} from "../../users/dtos/SignInUser.dto";
import {Public} from "../services/public.decorator";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {
    }

    @Post('sign-up')
    async signUp(@Body() createUserDto: CreateUserDto) {
        return this.usersService.createUser(createUserDto);
    }

    @Public()
    @Post('sign-in')
    async signIn(@Body() signInDto: SignInUserDto) {
        return this.authService.signIn(signInDto);
    }
}

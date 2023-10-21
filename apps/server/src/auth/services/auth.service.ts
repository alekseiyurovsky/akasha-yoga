import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SignInUserDto} from "../../users/dtos/SignInUser.dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async signIn({email, password_hash}: SignInUserDto) {
        const user = await this.usersService.findOneByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordIsValid = await user.validatePassword(password_hash);

        if (!passwordIsValid) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = {id: user.id, username: user.email, name: user.name, surname: user.surname};
        const access_token = await this.jwtService.signAsync(payload);

        return {access_token};
    }
}

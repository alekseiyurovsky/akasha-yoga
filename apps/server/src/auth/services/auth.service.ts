import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {SignInUserDto} from "../../users/dtos/SignInUser.dto";
import {UsersService} from "../../users/services/users.service";

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user && (await user.validatePassword(password))) {
            const {password_hash, ...result} = user;
            return result;
        }
        return null;
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

        const payload = {id: user.id, email: user.email, name: user.name, surname: user.surname, roleId: user.roleId};
        const access_token = await this.jwtService.signAsync(payload);

        return {
          access_token,
          id: user.id,
          name: user.name,
          surname: user.surname,
          email: user.email,
          date_of_birth: user.date_of_birth,
          about: user.about,
          role: user.role
        };
    }
}

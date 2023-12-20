import {AuthService} from "./auth.service";
import {UsersService} from "../../users/services/users.service";
import {JwtService} from "@nestjs/jwt";
import {MockService} from "ng-mocks";

describe('AuthService', () => {
    let authService, usersService, jwtService;
    beforeEach(() => {
        usersService = MockService(UsersService);
        jwtService = MockService(jwtService);
        authService = new AuthService(usersService, jwtService);
    });

    describe('#validateUser', () => {
        it('should resolve to null if user is not found', async () => {
            await expect(authService.validateUser('', '')).resolves.toBe(null);
        });

        it('should resolve to null if user is fount but password is not validated', async () => {
            usersService = MockService(UsersService, {
                findOneByEmail: email => 'user'
            });
            await expect(authService.validateUser('', '')).resolves.toBe(null);
        });
    })
});

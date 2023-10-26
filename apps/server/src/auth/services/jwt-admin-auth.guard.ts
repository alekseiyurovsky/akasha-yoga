import {Injectable, UnauthorizedException} from '@nestjs/common';
import {JwtAuthGuard} from "./jwt-auth.guard";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class JwtAdminAuthGuard extends JwtAuthGuard {

    private readonly ADMIN_ROLES = ['2','3'];

    constructor(protected jwtService: JwtService) {
        super(jwtService);
    }

    override checkPayload(payload) {
        if (!payload?.roleId || !this.ADMIN_ROLES.includes(payload.roleId)) {
            throw new UnauthorizedException('Privileges missing!');
        }
        return payload;
    }
}

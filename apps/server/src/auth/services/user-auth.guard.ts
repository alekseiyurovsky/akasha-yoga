import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class UserAuthGuard implements CanActivate {
    constructor(protected jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }

        let payload;
        try {
            payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: 'secret'
                }
            );
        } catch {
            throw new UnauthorizedException();
        }
        if (!payload?.id || payload.id !== request.params.id) {
            throw new UnauthorizedException('User not authorized to perform such action');
        }
        return true;
    }

    protected extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

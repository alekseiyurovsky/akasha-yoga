import {CanActivate, ExecutionContext, Injectable, Logger, UnauthorizedException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Request} from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(protected jwtService: JwtService) {
    }

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
        const veryfiedPayload = this.checkPayload(payload);
        request['user'] = veryfiedPayload;
        return true;
    }

    protected checkPayload(payload) {
        if (!payload) {
            throw new UnauthorizedException();
        }
        return payload;
    }

    protected extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}

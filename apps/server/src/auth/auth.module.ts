import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import {AuthService} from "./services/auth.service";
import {Module} from '@nestjs/common';
import {AuthController} from "./controller/auth.controller";
import {UsersService} from "../users/services/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../app/typeorm/entities/User";
import {Training} from "../app/typeorm/entities/Training";
import {Schedule} from "../app/typeorm/entities/Schedule";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: process.env.JWT_SECRET || 'secret',
            signOptions: { expiresIn: '2h' },
        }),
        TypeOrmModule.forFeature([User, Training, Schedule])
    ],
    providers: [AuthService, UsersService],
    exports: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {}

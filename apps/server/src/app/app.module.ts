import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./typeorm/entities/User";
import {Role} from "./typeorm/entities/Role";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'akasha',
            password: 'g63gados85', //todo  find secure way
            database: 'akashayoga',
            entities: [User, Role],
            synchronize: true
        }),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}

import {Module} from '@nestjs/common';
import {MulterModule} from '@nestjs/platform-express';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {AnnouncementsModule} from '../announcements/announcements.module';
import {ArticlesModule} from '../articles/articles.module';
import {SchedulesModule} from '../schedules/schedules.module';
import {TrainingsModule} from '../trainings/trainings.module';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Announcement} from './typeorm/entities/Announcement';
import {Article} from './typeorm/entities/Article';
import {Schedule} from './typeorm/entities/Schedule';
import {Training} from './typeorm/entities/Training';
import {User} from "./typeorm/entities/User";
import {Role} from "./typeorm/entities/Role";
import {UsersModule} from "../users/users.module";
import {AuthModule} from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'akasha',
            password: 'g63gados85', //todo  find secure way
            database: 'akashayoga',
            entities: [User, Role, Article, Schedule, Training, Announcement],
            synchronize: true
        }),
        MulterModule.register({
          dest: './src/assets',
        }),
        ServeStaticModule.forRoot({
          rootPath: join(__dirname, 'assets'),
          serveStaticOptions: {
            redirect: false,
            index: false
          }
        }),
        UsersModule,
        ArticlesModule,
        AnnouncementsModule,
        TrainingsModule,
        SchedulesModule,
        AuthModule
    ]
})
export class AppModule {
}

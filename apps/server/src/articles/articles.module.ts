import { Module } from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {Article} from '../app/typeorm/entities/Article';
import {User} from '../app/typeorm/entities/User';
import { ArticlesController } from './controllers/articles.controller';
import { ArticlesService } from './services/articles.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService]
})
export class ArticlesModule {}

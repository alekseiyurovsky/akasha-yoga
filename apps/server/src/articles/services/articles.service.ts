import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Article} from '../../app/typeorm/entities/Article';
import {CreateArticleDto} from '../dtos/CreateArticle.dto';
import {PatchArticleDto} from '../dtos/PatchArticle.dto';

@Injectable()
export class ArticlesService {
  constructor(@InjectRepository(Article) private articleRepository: Repository<Article>) {}

  public findArticles() {
    return this.articleRepository.find({
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      relations: ['author']
    });
  }

  public findOne(id: number): Promise<Article> {
    return this.articleRepository.findOne({
      where: {id},
      select: {
        author: {
          name: true,
          surname: true
        }
      },
      relations: ['author']
    });
  }

  public createArticle(articleDetails: CreateArticleDto) {
    const article = this.articleRepository.create(articleDetails);
    return this.articleRepository.save(article);
  }

  public updateArticle(id: number, patchArticleDetails: Partial<PatchArticleDto>) {
    return this.articleRepository.update({id}, {...patchArticleDetails});
  }
}

import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CreateArticleDto} from '../dtos/CreateArticle.dto';
import {PatchArticleDto} from '../dtos/PatchArticle.dto';
import {ArticlesService} from '../services/articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Get()
  getArticles() {
    return this.articlesService.findArticles();
  }

  @Get(':id')
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Post()
  createArticle(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.createArticle(createArticleDto);
  }

  @Patch(':id')
  async updateArticleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchUserDto: Partial<PatchArticleDto>,
  ) {
    await this.articlesService.updateArticle(id, patchUserDto);
    return this.articlesService.findOne(id);
  }
}

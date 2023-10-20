import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CreateAnnouncementDto} from '../dtos/CreateAnnouncement.dto';
import {PatchAnnouncementDto} from '../dtos/PatchAnnouncement.dto';
import {AnnouncementsService} from '../services/announcements.service';

@Controller('news')
export class AnnouncementsController {
  constructor(private announcementsService: AnnouncementsService) {}

  @Get()
  getArticles() {
    return this.announcementsService.findAnnouncements();
  }

  @Get(':id')
  getArticle(@Param('id', ParseIntPipe) id: number) {
    return this.announcementsService.findOne(id);
  }

  @Post()
  createArticle(@Body() createAnnouncementDto: CreateAnnouncementDto) {
    return this.announcementsService.createAnnouncement(createAnnouncementDto);
  }

  @Patch(':id')
  async updateArticleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchAnnouncementDto: Partial<PatchAnnouncementDto>,
  ) {
    await this.announcementsService.updateAnnouncement(id, patchAnnouncementDto);
    return this.announcementsService.findOne(id);
  }
}

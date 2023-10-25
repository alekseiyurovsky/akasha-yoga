import {
  Body,
  Controller,
  FileTypeValidator,
  Get, MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseIntPipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {JwtAdminAuthGuard} from '../../auth/services/jwt-admin-auth.guard';
import {JwtAuthGuard} from '../../auth/services/jwt-auth.guard';
import {Public} from '../../auth/services/public.decorator';
import {CreateTrainingDto} from '../dtos/CreateTraining.dto';
import {PatchTrainingDto} from '../dtos/PatchTraining.dto';
import {TrainingsService} from '../services/trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private trainingsService: TrainingsService) {}

  @Public()
  @Get()
  getTrainings() {
    return this.trainingsService.findTrainings();
  }

  @Public()
  @Get(':id')
  getTraining(@Param('id', ParseIntPipe) id: number) {
    return this.trainingsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, JwtAdminAuthGuard)
  @Post()
  createTraining(@Body() createTrainingDto: CreateTrainingDto) {
    return this.trainingsService.createTraining(createTrainingDto);
  }

  @Patch(':id')
  async updateTrainingById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchTrainingDto: Partial<PatchTrainingDto>,
  ) {
    await this.trainingsService.updateTraining(id, patchTrainingDto);
    return this.trainingsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPic(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
      file: Express.Multer.File,
    @Param() params,
  ) {
    return this.trainingsService.uploadPic(file, params.id);
  }
}

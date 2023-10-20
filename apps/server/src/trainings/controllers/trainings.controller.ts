import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CreateTrainingDto} from '../dtos/CreateTraining.dto';
import {PatchTrainingDto} from '../dtos/PatchTraining.dto';
import {TrainingsService} from '../services/trainings.service';

@Controller('trainings')
export class TrainingsController {
  constructor(private trainingsService: TrainingsService) {}

  @Get()
  getTrainings() {
    return this.trainingsService.findTrainings();
  }

  @Get(':id')
  getTraining(@Param('id', ParseIntPipe) id: number) {
    return this.trainingsService.findOne(id);
  }

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
}

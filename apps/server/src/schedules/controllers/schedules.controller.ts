import {Body, Controller, Get, Param, ParseIntPipe, Patch, Post} from '@nestjs/common';
import {CreateScheduleDto} from '../dtos/CreateSchedule.dto';
import {PatchScheduleDto} from '../dtos/PatchSchedule.dto';
import {SchedulesService} from '../services/schedules.service';

@Controller('schedules')
export class SchedulesController {
  constructor(private schedulesService: SchedulesService) {}

  @Get()
  async getSchedules() {
    return this.schedulesService.findSchedules();
  }

  @Get(':id')
  getSchedule(@Param('id', ParseIntPipe) id: number) {
    return this.schedulesService.findOne(id);
  }

  @Post()
  createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return this.schedulesService.createSchedule(createScheduleDto);
  }

  @Patch(':id')
  async updateScheduleById(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchScheduleDto: Partial<PatchScheduleDto>,
  ) {
    await this.schedulesService.updateSchedule(id, patchScheduleDto);
    return this.schedulesService.findOne(id);
  }
}

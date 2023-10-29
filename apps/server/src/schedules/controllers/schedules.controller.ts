import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateScheduleDto} from '../dtos/CreateSchedule.dto';
import {PatchScheduleDto} from '../dtos/PatchSchedule.dto';
import {SchedulesService} from '../services/schedules.service';
import {JwtAuthGuard} from "../../auth/services/jwt-auth.guard";

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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTrainingById(
      @Param('id', ParseIntPipe) id: number,
  ): Promise<void> {
    await this.schedulesService.deleteSchedule(id);
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

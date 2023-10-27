import {CommonModule} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import {firstValueFrom} from 'rxjs';
import {AdDirective} from '../common/adhost.directive';
import {DataService} from '../common/data.service';
import {HttpService} from '../common/http.service';
import {Training, TrainingView} from '../common/model/Training';
import {CreateTrainingPopupComponent} from '../trainings/ui/create-training-popup.component';
import {CreateSchedulePopupComponent} from './ui/create-schedule-popup.component';
import {calenderOptions} from './utils/calenderOptions';

@Component({
  selector: 'fse-schedule',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, FormsModule, AdDirective],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  public calendarOptions = calenderOptions;
  public showMine = false;

  constructor(
    public dataService: DataService,
    private httpService: HttpService
  ) {
  }

  public async create(): Promise<void> {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<CreateSchedulePopupComponent>(CreateSchedulePopupComponent);
    componentRef.instance.trainings = await firstValueFrom(this.httpService.get<Training[]>('api/trainings'));
    componentRef.instance.promise.finally(() => viewContainerRef.clear());
  }
}

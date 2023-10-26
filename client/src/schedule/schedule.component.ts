import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FullCalendarModule} from '@fullcalendar/angular';
import {CalendarOptions} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';


@Component({
    selector: 'fse-schedule',
    standalone: true,
    imports: [CommonModule, FullCalendarModule ],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

  public calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, bootstrap5Plugin ],
    themeSystem: 'bootstrap5'
  };
}

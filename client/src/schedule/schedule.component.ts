import {CommonModule} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {FullCalendarComponent, FullCalendarModule} from '@fullcalendar/angular';
import {firstValueFrom} from 'rxjs';
import {AdDirective} from '../common/adhost.directive';
import {DataService} from '../common/data.service';
import {HttpService} from '../common/http.service';
import {Training} from '../common/model/Training';
import {CreateSchedulePopupComponent} from './ui/create-schedule-popup.component';
import {calenderOptions} from './utils/calenderOptions';
import {ActivatedRoute, Router} from "@angular/router";
import {Schedule} from "../common/model/Schedule";
import {CalendarOptions, EventSourceInput} from "@fullcalendar/core";

@Component({
    selector: 'fse-schedule',
    standalone: true,
    imports: [CommonModule, FullCalendarModule, FormsModule, AdDirective],
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {

    @ViewChild('calendar', {static: true}) calendarComponent: FullCalendarComponent;
    @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

    public calendarOptions;

    private userId: string;

    constructor(
        public dataService: DataService,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.userId = this.dataService.getUser().id.toString();
        this.calendarOptions = {
            ...calenderOptions,
            events: (this.prepareEvents(this.route.snapshot.data['schedules']) as any),
            eventClick: this.onEventClick.bind(this)
        };
    }

    public async onEventClick(event: any) {
        await this.router.navigate(['schedule', event.event._def.publicId])
    }

    private getEventClassName(schedule: Schedule): string {
        if (schedule.approved?.some(user => user.id === this.userId)) {
            return 'approved';
        }

        if (schedule.unapproved?.some(user => user.id === this.userId)) {
            return 'unapproved';
        }
        const isFull = schedule.training.max_count === [...schedule.    approved ?? [], ...schedule.unapproved ?? []].length;
        return isFull ? 'full' : 'default';
    }

    public showSubscribed(): void {
        const parsedEvents = this.route.snapshot.data['schedules']
            .filter((schedule: Schedule) => [...schedule.approved ?? [], ...schedule.unapproved ?? []].some(user => user.id === this.userId))
        this.reloadEvents(this.prepareEvents(parsedEvents));
    }

    public showAuthored(): void {
        const parsedEvents = this.route.snapshot.data['schedules'].filter((schedule: Schedule) => schedule.author_id === this.userId)
        this.reloadEvents(this.prepareEvents(parsedEvents));
    }

    public showAll(): void {
        this.reloadEvents(this.calendarOptions.events);
    }

    public async create(): Promise<void> {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const trainings = await firstValueFrom(this.httpService.get<Training[]>('api/trainings'));
        const componentRef = viewContainerRef.createComponent<CreateSchedulePopupComponent>(CreateSchedulePopupComponent);
        componentRef.instance.trainings = trainings;
        componentRef.instance.promise.finally(() => viewContainerRef.clear());
    }

    private prepareEvents(events: any[]): unknown[] {
        return events.map((scheduleItem: Schedule) => {
            const isFull = scheduleItem.training.max_count === [...scheduleItem.    approved ?? [], ...scheduleItem.unapproved ?? []].length;
            return {
                id: scheduleItem.id,
                start: scheduleItem.date,
                title: `${scheduleItem.training.name}${isFull ? ' (Nav vietu)' : ''}`,
                className: this.getEventClassName(scheduleItem)
            }
        });
    }

    private reloadEvents(events: any[]) {
        const api = this.calendarComponent?.getApi();
        api.removeAllEvents();
        api.addEventSource({events: events} as EventSourceInput);
    }
}

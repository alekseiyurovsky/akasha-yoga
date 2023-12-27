import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataService} from "../common/data.service";
import {HttpService} from "../common/http.service";
import {LocalStorageService} from "../common/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {User} from "../common/model/User";
import {take} from "rxjs";
import {FullCalendarModule} from "@fullcalendar/angular";
import {calenderOptions} from "../schedule/utils/calenderOptions";
import {Schedule} from "../common/model/Schedule";

type UserFormControls = Pick<User, 'name' | 'surname' | 'email' | 'date_of_birth' | 'about'>;

@Component({
    selector: 'fse-user',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, FullCalendarModule],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public calendarOptions: any;
    private userId: string;

    public userForm = this.formBuilder.group<UserFormControls>({
        name: '',
        surname: '',
        email: '',
        date_of_birth: '',
        about: ''
    });

    public isEdit = false;

    constructor(
        public dataService: DataService,
        private httpService: HttpService,
        private storage: LocalStorageService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
        this.userId = this.dataService.getUser().id.toString();
    }

    public ngOnInit(): void {
      const {name, surname, email, date_of_birth, about} = this.dataService.getUser();
      this.userForm.patchValue({name, surname, about, date_of_birth, email} as any);

      this.activatedRoute.data.subscribe(({userSchedules}) => {
            if (userSchedules) {
                this.dataService.setUserSchedules(userSchedules);
                this.calendarOptions = {
                    ...calenderOptions,
                    headerToolbar: {
                        center: '',
                        end: ''
                    },
                    events: (this.prepareEvents(this.dataService.getSchedules()) as any),
                    eventClick: this.onEventClick.bind(this)
                };
                console.log(this.dataService.getSchedules())
            }
        })
    }

    public async logOut(): Promise<void> {
        this.dataService.cleanUp();
        this.httpService.setToken('');
        this.storage.remove();
        await this.router.navigate(['']);
    }

    public cancel(): void {
        this.isEdit = false;
        this.userForm.patchValue({...this.dataService.getUser() as any});
    }

    public onSubmit(): void {
        this.httpService.patch<User>(
            `api/users/${this.dataService.getUser().id}`,
            {...this.userForm.getRawValue()}
        ).pipe(take(1)).subscribe(
            (user: User) => {
                this.dataService.setUser(user);
                this.isEdit = false;
            },
            err => {
                this.cancel();
            })
    }

    public async onEventClick(event: any) {
        await this.router.navigate(['schedule', event.event._def.publicId])
    }

    private prepareEvents(events: any[]): unknown[] {
        return events.map((scheduleItem: Schedule) => {
            const isFull = scheduleItem.training.max_count === [...scheduleItem.approved ?? [], ...scheduleItem.unapproved ?? []].length;
            return {
                id: scheduleItem.id,
                start: scheduleItem.date,
                title: `${scheduleItem.training.name}${isFull ? ' (Nav vietu)' : ''}`,
                className: this.getEventClassName(scheduleItem)
            }
        });
    }

    private getEventClassName(schedule: Schedule): string {
        console.log(schedule)
        if (schedule.approved?.some(user => user.id == this.userId)) {
            console.log('approved')
            return 'approved';
        }

        if (schedule.unapproved?.some(user => user.id == this.userId)) {
            console.log('unapproved')
            return 'unapproved';
        }
        console.log('default')
        console.log(this.userId)

        const isFull = schedule.training.max_count === [...schedule.approved ?? [], ...schedule.unapproved ?? []].length;

        return isFull ? 'full' : 'default';
    }

}

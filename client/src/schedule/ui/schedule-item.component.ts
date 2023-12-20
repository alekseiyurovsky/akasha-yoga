import {Component, ViewChild} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AdDirective} from "../../common/adhost.directive";
import {FormsModule} from "@angular/forms";
import {DataService} from "../../common/data.service";
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {HttpService} from "../../common/http.service";
import {Schedule} from "../../common/model/Schedule";
import {User} from "../../common/model/User";
import {ConfirmCancelApplicationPopupComponent} from "./confirm-cancel-popup.component";
import {firstValueFrom, take} from "rxjs";
import {ConfirmApplyPopupComponent} from "./confirm-apply-popup.component";
import {Training} from "../../common/model/Training";
import {EditSchedulePopupComponent} from "./edit-schedule-popup.component";
import {ConfirmDeletePopupComponent} from "./confirm-delete-popup.component";


@Component({
    selector: 'fse-schedule-item',
    standalone: true,
    imports: [CommonModule, FormsModule, AdDirective, RouterModule],
    templateUrl: './schedule-item.component.html',
    styleUrls: ['./schedule-item.component.scss']
})
export class ScheduleItemComponent {

    @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
    private readonly userId = this.dataService.getUser().id.toString();

    public schedule = this.route.snapshot.data['schedule'] as Schedule;
    public authorName = `${this.schedule.author.name} ${this.schedule.author.surname}`;

    constructor(
        public dataService: DataService,
        private httpService: HttpService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        console.log(this.route.snapshot.data['schedule']);
    }

    public isFull(): boolean {
        return this.getCurrentCount() === this.schedule.training.max_count;
    }

    public isCurrentUserApplied(): boolean {
        return this.getTotalUsers().some(applicant => applicant.id === this.userId);
    }

    public isApproved(): boolean {
        return (this.schedule.approved ?? []).some(applicant => applicant.id === this.userId);
    }

    public isUnapproved(): boolean {
        return (this.schedule.unapproved ?? []).some(applicant => applicant.id === this.userId);
    }

    public getCurrentCount(): number {
        return this.getTotalUsers().length;
    }

    private getTotalUsers(): Pick<User, 'name' | 'surname' | 'id'>[] {
        return [...this.schedule.approved ?? [], ...this.schedule.unapproved ?? []];
    }

    public apply(): void {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<ConfirmApplyPopupComponent>(ConfirmApplyPopupComponent);
        componentRef.instance.promise
            .then(confirmed => {
                if (confirmed) {
                    const unapproved = this.schedule.unapproved?.map(applicant => applicant.id) ?? [];
                    this.httpService.patch<Schedule>(`api/schedules/${this.schedule.id}`, {
                        unapproved_entrants: [...unapproved, this.userId]
                    }).pipe(take(1))
                        .subscribe(resp => {
                            this.schedule.unapproved = [...resp.unapproved];
                        })
                }
            })
            .finally(() => {
                viewContainerRef.clear();
            });
    }

    public cancelApplication(): void {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<ConfirmCancelApplicationPopupComponent>(ConfirmCancelApplicationPopupComponent);
        componentRef.instance.promise
            .then(confirmed => {
                if (confirmed) {
                    const payload: { approved_entrants?: string[], unapproved_entrants?: string[] } = {};
                    if (this.isApproved()) {
                        payload.approved_entrants = this.schedule.approved.map(applicant => applicant.id).filter(id => id !== this.userId);
                        payload.unapproved_entrants = this.schedule.unapproved ? this.schedule.unapproved.map(applicant => applicant.id) : [];
                    }
                    if (this.isUnapproved()) {
                        payload.unapproved_entrants = this.schedule.unapproved.map(applicant => applicant.id).filter(id => id !== this.userId);
                        payload.approved_entrants = this.schedule.approved ? this.schedule.approved.map(applicant => applicant.id) : [];
                    }
                    this.httpService.patch<Schedule>(`api/schedules/${this.schedule.id}`, {...payload})
                        .pipe(take(1))
                        .subscribe(resp => {
                            this.schedule = {...resp};
                        })
                }
            })
            .finally(() => {
                viewContainerRef.clear();
            });
    }

    public delete(): void {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<ConfirmDeletePopupComponent>(ConfirmDeletePopupComponent);
        componentRef.instance.promise
            .then(confirmed => {
                if (confirmed) {
                    this.httpService.delete<Schedule>(`api/schedules/${this.schedule.id}`)
                        .pipe(take(1))
                        .subscribe(async resp => {
                            await this.router.navigate(['/schedule'])
                        })
                }
            })
            .finally(() => {
                viewContainerRef.clear();
            });

    }

    public async edit(): Promise<void> {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const trainings = await firstValueFrom(this.httpService.get<Training[]>('api/trainings'));
        const componentRef = viewContainerRef.createComponent<EditSchedulePopupComponent>(EditSchedulePopupComponent);
        componentRef.instance.trainings = trainings;
        componentRef.instance.schedule = this.schedule;
        componentRef.instance.setInputs();
        componentRef.instance.promise
            .then(result => this.schedule = {...result})
            .finally(() => viewContainerRef.clear());
    }
}

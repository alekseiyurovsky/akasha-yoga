import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {MatDatepickerInputEvent, MatDatepickerModule} from '@angular/material/datepicker';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {DataService} from '../../common/data.service';
import {HttpService} from '../../common/http.service';
import {Training} from '../../common/model/Training';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';
import {getFormattedStorageDateString} from '../utils/getFormattedStorageDateString';
import {catchError, firstValueFrom, of, take} from "rxjs";
import {Schedule} from "../../common/model/Schedule";

@Component({
    selector: 'fse-create-training-popup',
    standalone: true,
    imports: [CommonModule, FormsModule, NgxMaterialTimepickerModule, MatDatepickerModule, MatNativeDateModule],
    providers: [HttpClient],
    templateUrl: './edit-schedule-popup.component.html',
    styleUrls: ['./edit-schedule-popup.component.scss']
})
export class EditSchedulePopupComponent extends DynamicPopupContainerComponent<Schedule> {

    public error = '';
    public readonly minDate = new Date();

    public schedule: Schedule;

    public trainings: Training[] = [];
    public selectedTrainingsId: number;
    public selectedDate: Date;
    public selectedTime = '';


    constructor(
        private httpService: HttpService
    ) {
        super();
    }

    public setInputs() {
        this.selectedTrainingsId = this.schedule.training.id;
        this.selectedDate = new Date(this.schedule.date);
        this.selectedTime = `${this.selectedDate.getHours()}:${this.selectedDate.getMinutes()}`
    }

    public onTimeSet(time: string) {
        this.selectedTime = time;
    }

    public onDateInput({value}: MatDatepickerInputEvent<Date>) {
        this.selectedDate = value as Date;
    }

    public async edit() {
        this.error = '';
        if (!this.validate()) {
            return;
        }

        const result: Schedule | null = await firstValueFrom(
            this.httpService.patch<Schedule>(`api/schedules/${this.schedule.id}`, {
                date: getFormattedStorageDateString(this.selectedDate, this.selectedTime),
                training_id: this.selectedTrainingsId
            }).pipe(
                take(1),
                catchError(err => {
                    this.error = err.error.message;
                    return of(null)
                })
            )
        );

        if (!result) {
            return;
        }

        await this.apply(result);
    }

    private validate(): boolean {
        if (!this.selectedTrainingsId || !this.selectedTime || !this.selectedDate) {
            this.error = 'Visi laukumi nav aizpildīti';
            return false;
        }
        return true;
    }
}

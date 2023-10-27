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

@Component({
  selector: 'fse-create-training-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaterialTimepickerModule, MatDatepickerModule, MatNativeDateModule],
  providers: [HttpClient],
  templateUrl: './create-schedule-popup.component.html',
  styleUrls: ['./create-schedule-popup.component.scss']
})
export class CreateSchedulePopupComponent extends DynamicPopupContainerComponent {

  public error = '';
  public readonly minDate = new Date();

  public trainings: Training[] = [];
  public selectedTrainingsId: number;
  public selectedDate: Date;
  public selectedTime = '';


  constructor(
    private httpService: HttpService,
    private dataService: DataService
  ) {
    super();
  }

  public onTimeSet(time: string) {
    console.log('time selected: ', time);
    this.selectedTime = time;
  }

  public onDateInput({value}: MatDatepickerInputEvent<Date>) {
    console.log('date selected: ', value);
    this.selectedDate = value as Date;
  }

  public create() {

    console.log(this.selectedDate);
    console.log(this.selectedTrainingsId);
    console.log(this.selectedTime);

    this.error = '';
    if (!this.validate()) {
      return;
    }
    console.log('chpok');
    console.log('constructedDate: ', getFormattedStorageDateString(this.selectedDate, this.selectedTime));
  }

  private validate(): boolean {
    if (!this.selectedTrainingsId || !this.selectedTime || !this.selectedDate) {
      this.error = 'Visi laukumi nav aizpildīti';
      return false;
    }
    return true;
  }
}

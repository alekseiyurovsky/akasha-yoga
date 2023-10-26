import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {finalize, take} from 'rxjs';
import {HttpService} from '../../common/http.service';
import {Training} from '../../common/model/Training';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
  selector: 'fse-delete-training-popup',
  standalone: true,
  imports: [CommonModule],
  providers: [HttpClient],
  templateUrl: './delete-training-popup.component.html',
  styleUrls: ['./delete-training-popup.component.scss']
})
export class DeleteTrainingPopupComponent extends DynamicPopupContainerComponent<boolean> {

  public training: Pick<Training, 'id' | 'name'>;

  constructor(
    private httpService: HttpService
  ) {
    super();
  }

  public async delete() {
    this.httpService.delete<unknown>(`api/trainings/${this.training.id}`).pipe(
      take(1),
      finalize(() => this.apply(true))
    ).subscribe();
  }
}

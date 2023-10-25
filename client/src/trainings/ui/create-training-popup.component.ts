import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {FileChangeEvent} from '@angular/compiler-cli/src/perform_watch';
import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {catchError, firstValueFrom, of, take} from 'rxjs';
import {DataService} from '../../common/data.service';
import {HttpService} from '../../common/http.service';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
  selector: 'fse-create-training-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClient],
  templateUrl: './create-training-popup.component.html',
  styleUrls: ['./create-training-popup.component.scss']
})
export class CreateTrainingPopupComponent extends DynamicPopupContainerComponent {

  error = '';

  public trainingForm = this.formBuilder.group<any>({
    name: '',
    description: '',
    duration: undefined,
    max_count: undefined,
  });

  private file: any;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private formBuilder: FormBuilder
  ) {
    super();
  }

  public onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  };


  async onSubmit() {
    const values = this.trainingForm.getRawValue();
    const result: any = await firstValueFrom(
      this.httpService.post<unknown>('api/trainings', {
        'name': values['name'],
        'description': values['description'],
        'duration': values['duration'],
        'max_count': values['max_count'],
        'author_id': this.dataService.getUser().id
      }).pipe(take(1), catchError(err => {
        this.error = err?.error.message;
        return of(null);
      }))
    );

    if(!result.id || !this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    this.file = undefined;

    this.httpService.post<unknown>(`api/trainings/${result.id}/upload`, formData).pipe(
      take(1)
    ).subscribe(
      resp => {
        this.apply();
      },
      err => {
        this.error = err?.error.message;
      }
    );
  }
}

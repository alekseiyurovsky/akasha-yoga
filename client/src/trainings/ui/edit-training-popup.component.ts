import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {catchError, firstValueFrom, of, take} from 'rxjs';
import {DataService} from '../../common/data.service';
import {HttpService} from '../../common/http.service';
import {Training} from '../../common/model/Training';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

type EditTrainingPayload = Pick<Training, 'name' | 'description' | 'duration' | 'max_count'>;

@Component({
  selector: 'fse-edit-training-popup',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [HttpClient],
  templateUrl: './edit-training-popup.component.html',
  styleUrls: ['./edit-training-popup.component.scss']
})
export class EditTrainingPopupComponent extends DynamicPopupContainerComponent<string | undefined> {

  error = '';
  public trainingForm = this.formBuilder.group<EditTrainingPayload>({
    name: '',
    description: '',
    duration: 0,
    max_count: 0
  }, {
    updateOn: 'change'
  });

  public file: File | null;
  private exampleForm: EditTrainingPayload;

  constructor(
    private httpService: HttpService,
    private dataService: DataService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    super();
  }

  public setForm(training: EditTrainingPayload): void {
    this.exampleForm = {...training};
    this.trainingForm.patchValue({...training});
  }

  public onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.file = files[0];
  };

  async onSubmit() {
    const values = this.trainingForm.getRawValue();
    const editedFields: Partial<EditTrainingPayload> = {};

    if (values.name !== this.exampleForm.name) {
      editedFields.name = values.name as string;
    }

    if (values.description !== this.exampleForm.description) {
      editedFields.description = values.description as string;
    }

    if (values.duration !== this.exampleForm.duration) {
      editedFields.duration = values.duration as number;
    }

    if (values.max_count !== this.exampleForm.max_count) {
      editedFields.max_count = values.max_count as number;
    }

    if (JSON.stringify(editedFields) === '{}' && !this.file) {
      return;
    }

    const id = this.route.snapshot.paramMap.get('id');

    if (JSON.stringify(editedFields) !== '{}') {
      await firstValueFrom(
        this.httpService.patch<unknown>(`api/trainings/${id}`, {...editedFields})
          .pipe(
            take(1),
            catchError(err => {
              this.error = err?.error.message;
              return of('failed');
            })
          )
      );
    }

    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);
    this.file = null;

    this.httpService.post<any>(`api/trainings/${id}/upload`, formData).pipe(
      take(1)
    ).subscribe(
      ({data: {display_url}}) => {
        this.apply(display_url ?? undefined);
      },
      err => {
        this.error = err?.error.message;
      }
    );
  }
}

import {CommonModule} from '@angular/common';
import {Component, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AdDirective} from '../../common/adhost.directive';
import {DataService} from '../../common/data.service';
import {Training} from '../../common/model/Training';
import {DeleteTrainingPopupComponent} from './delete-training-popup.component';
import {EditTrainingPopupComponent} from './edit-training-popup.component';

@Component({
  selector: 'fse-training-expanded',
  standalone: true,
  imports: [CommonModule, AdDirective],
  templateUrl: './training-expanded.component.html',
  styleUrls: ['./training-expanded.component.scss']
})
export class TrainingExpandedComponent {

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  public training: Training;
  public authorName: string;
  public bgImage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public dataService: DataService,
    private router: Router
  ) {
    this.training = this.activatedRoute.snapshot.data['training'] as Training;
    this.authorName = `${this.training.author.name } ${this.training.author.surname}`;
    this.generateBgUrl();
  }

  public async delete(): Promise<void> {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<DeleteTrainingPopupComponent>(DeleteTrainingPopupComponent);
    componentRef.instance.training = {
      id: this.training.id,
      name: this.training.name
    }
    componentRef.instance.promise
      .then(async isDeleted => {
        if(isDeleted) {
          await this.router.navigate(['/trainings']);
        }
      })
      .finally(() => {
        viewContainerRef.clear();
      });
  }

  public async edit(): Promise<void> {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<EditTrainingPopupComponent>(EditTrainingPopupComponent);
    componentRef.instance.setForm({
      name: this.training.name,
      description: this.training.description,
      duration: this.training.duration,
      max_count: this.training.max_count
    });
    componentRef.instance.promise
      .then(response => {
        if(response) {
          this.training.image_url = response;
          this.generateBgUrl();
        }
      })
      .finally(() => {
        viewContainerRef.clear();
      });
  }

  private generateBgUrl() {
    this.bgImage = `url("${this.training.image_url}")`;
  }
}

import {CommonModule} from '@angular/common';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AdDirective} from '../common/adhost.directive';
import {DataService} from '../common/data.service';
import {CreateTrainingPopupComponent} from './ui/create-training-popup.component';
import {TrainingCardComponent} from './ui/training-card.component';
import {TrainingView} from "../common/model/Training";

@Component({
  selector: 'fse-trainings',
  standalone: true,
  imports: [CommonModule, AdDirective, TrainingCardComponent],
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  public trainings: TrainingView[];

  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.trainings = this.activatedRoute.snapshot.data['trainings'];
  }

  public create(): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<CreateTrainingPopupComponent>(CreateTrainingPopupComponent);
    componentRef.instance.promise
      .finally(() => {
        viewContainerRef.clear();
      });
  }
}

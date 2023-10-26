import {CommonModule} from '@angular/common';
import {Component, Input} from '@angular/core';
import {RouterModule} from '@angular/router';
import {TrainingView} from '../../common/model/Training';

@Component({
  selector: 'fse-training-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent {

  @Input()
  training: TrainingView;
}

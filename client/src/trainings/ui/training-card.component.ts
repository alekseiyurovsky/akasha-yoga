import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'fse-training-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit {

  @Input()
  training: any;

  constructor(
  ) {}

  public ngOnInit(): void {
    console.log('hiiiiiiiiiiiiiii');
  }
}

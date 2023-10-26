import {CommonModule} from '@angular/common';
import {Component, Input, OnInit} from '@angular/core';
import {TrainingView} from "../../common/model/Training";
import {Router} from "@angular/router";

@Component({
  selector: 'fse-training-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-card.component.html',
  styleUrls: ['./training-card.component.scss']
})
export class TrainingCardComponent implements OnInit {

  @Input()
  training: TrainingView;

  constructor(private router: Router) {}

  public ngOnInit(): void {
    console.log('hiiiiiiiiiiiiiii');
  }
}

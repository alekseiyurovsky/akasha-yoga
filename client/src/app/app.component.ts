import {HttpClientModule} from '@angular/common/http';
import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AdDirective} from '../common/adhost.directive';
import {HeaderComponent} from '../common/header/header.component';

@Component({
  standalone: true,
  imports: [RouterModule, HttpClientModule, HeaderComponent, AdDirective, HttpClientModule],
  selector: 'fse-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
}

import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ChangeDetectorRef, Component, Injector, ViewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginPopupComponent} from '../../user/ui/login-popup.component';
import {AdDirective} from '../adhost.directive';
import {DataService} from '../data.service';
import {HttpService} from '../http.service';
import {PopupService} from '../popup.service';
import {SignupPopupComponent} from "../../user/ui/signup-popup.component";

@Component({
  selector: 'fse-header',
  standalone: true,
  imports: [CommonModule, RouterModule, AdDirective, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

  constructor(
    public dataService: DataService
  ) {
  }

  login(): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<LoginPopupComponent>(LoginPopupComponent);
    componentRef.instance.promise
      .finally(() => {
        viewContainerRef.clear();
      });
  }

  signup(): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<SignupPopupComponent>(SignupPopupComponent);
    componentRef.instance.promise
        .finally(() => {
          viewContainerRef.clear();
        });
  }
}

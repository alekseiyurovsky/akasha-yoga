import {CommonModule} from '@angular/common';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {ChangeDetectorRef, Component, Injector, ViewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginPopupComponent} from '../../user/ui/login-popup.component';
import {AdDirective} from '../adhost.directive';
import {DataService} from '../data.service';
import {HttpService} from '../http.service';
import {PopupService} from '../popup.service';

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
    public dataService: DataService,
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    private httpService: HttpService
  ) {
  }

  login(): void {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent<LoginPopupComponent>(LoginPopupComponent, {
      injector: this.injector
    });
    componentRef.instance.promise
      .finally(() => {
        viewContainerRef.clear();
      })
    this.cdr.detectChanges();
  }

  signup(): void {

  }
}

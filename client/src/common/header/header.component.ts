import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {Component, ViewChild} from '@angular/core';
import {RouterModule} from '@angular/router';
import {LoginPopupComponent} from '../../user/ui/login-popup.component';
import {AdDirective} from '../adhost.directive';
import {DataService} from '../data.service';
import {SignupPopupComponent} from "../../user/ui/signup-popup.component";

@Component({
    selector: 'fse-header',
    standalone: true,
    imports: [CommonModule, RouterModule, AdDirective, HttpClientModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

    public isMenuOpen = true;

    @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;

    constructor(
        public dataService: DataService
    ) {
    }

    public login(): void {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<LoginPopupComponent>(LoginPopupComponent);
        componentRef.instance.promise
            .finally(() => {
                viewContainerRef.clear();
            });
    }


    public signup(): void {
        const viewContainerRef = this.adHost.viewContainerRef;
        viewContainerRef.clear();
        const componentRef = viewContainerRef.createComponent<SignupPopupComponent>(SignupPopupComponent);
        componentRef.instance.promise
            .finally(() => {
                viewContainerRef.clear();
            });
    }
}

import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
    selector: 'fse-apply-application-popup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-apply-popup.component.html',
    styleUrls: ['./confirm-apply-popup.component.scss']
})
export class ConfirmApplyPopupComponent extends DynamicPopupContainerComponent<boolean> {

    constructor() {
        super();
    }
}

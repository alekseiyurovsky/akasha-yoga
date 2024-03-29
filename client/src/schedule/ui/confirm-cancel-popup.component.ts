import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
    selector: 'fse-cancel-application-popup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-cancel-popup.component.html',
    styleUrls: ['./confirm-cancel-popup.component.scss']
})
export class ConfirmCancelApplicationPopupComponent extends DynamicPopupContainerComponent<boolean> {

    constructor() {
        super();
    }
}

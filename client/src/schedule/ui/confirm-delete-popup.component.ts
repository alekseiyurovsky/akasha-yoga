import {CommonModule} from '@angular/common';
import {Component} from '@angular/core';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
    selector: 'fse-delete-schedule-popup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './confirm-delete-popup.component.html',
    styleUrls: ['./confirm-delete-popup.component.scss']
})
export class ConfirmDeletePopupComponent extends DynamicPopupContainerComponent<boolean> {

    constructor() {
        super();
    }
}

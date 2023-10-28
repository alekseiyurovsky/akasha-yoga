import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component} from '@angular/core';
import {Training} from '../../common/model/Training';
import {DynamicPopupContainerComponent} from '../../common/ui/dynamic-popup-container.component';

@Component({
    selector: 'fse-cancel-aplication-popup',
    standalone: true,
    imports: [CommonModule],
    providers: [HttpClient],
    templateUrl: './confirm-cancel-popup.component.html',
    styleUrls: ['./confirm-cancel-popup.component.scss']
})
export class ConfirmCancelApplicationPopupComponent extends DynamicPopupContainerComponent<boolean> {

    public training: Pick<Training, 'id' | 'name'>;

    constructor() {
        super();
    }
}

import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataService} from "../common/data.service";
import {HttpService} from "../common/http.service";
import {LocalStorageService} from "../common/local-storage.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'fse-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{

    constructor(
        public dataService: DataService,
        private httpService: HttpService,
        private storage: LocalStorageService,
        private activatedRoute: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.activatedRoute.data.subscribe(({user, userSchedules}) => {
            if (user) {
                this.dataService.setUser(user);
                console.log(user)
            }

            if(userSchedules) {
                this.dataService.setUserSchedules(userSchedules);
                console.log(userSchedules)
            }
        })
    }

    logOut(): void {
        this.dataService.cleanUp();
        this.httpService.setToken('');
        this.storage.remove();
    }
}

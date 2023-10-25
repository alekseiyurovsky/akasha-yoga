import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataService} from "../common/data.service";
import {HttpService} from "../common/http.service";
import {LocalStorageService} from "../common/local-storage.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {User} from "../common/model/User";
import {take} from "rxjs";

type UserFormControls = Pick<User, 'name' | 'surname' | 'email' | 'date_of_birth' | 'about'>;

@Component({
    selector: 'fse-user',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

    public userForm = this.formBuilder.group<UserFormControls>({
        name: '',
        surname: '',
        email: '',
        date_of_birth: '',
        about: ''
    });

    public isEdit = false;

    constructor(
        public dataService: DataService,
        private httpService: HttpService,
        private storage: LocalStorageService,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private router: Router
    ) {
    }

    public ngOnInit(): void {
        this.activatedRoute.data.subscribe(({user, userSchedules}) => {
            if (user) {
                this.dataService.setUser(user);
                this.userForm.patchValue({...user});
            }

            if (userSchedules) {
                this.dataService.setUserSchedules(userSchedules);
            }
        })
    }

    public async logOut(): Promise<void> {
        this.dataService.cleanUp();
        this.httpService.setToken('');
        this.storage.remove();
        await this.router.navigate(['']);
    }

    public cancel(): void {
        this.isEdit = false;
        this.userForm.patchValue({...this.dataService.getUser() as any});
    }

    public onSubmit(): void {
        this.httpService.patch<User>(
            `api/users/${this.dataService.getUser().id}`,
            {...this.userForm.getRawValue()}
        ).pipe(take(1)).subscribe(
            (user: User) => {
                this.dataService.setUser(user);
                this.isEdit = false;
            },
            err => {
                this.cancel();
            })
    }
}

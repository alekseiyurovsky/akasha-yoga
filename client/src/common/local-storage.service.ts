import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class LocalStorageService {

    private readonly storageName = 'akasha_user_token';

    public set(value: string) {
        localStorage.setItem(this.storageName, value);
    }

    public get() {
        return localStorage.getItem(this.storageName);
    }

    public remove() {
        localStorage.removeItem(this.storageName);
    }
}

import {Directive} from '@angular/core';
import {Deferred} from '../util/Deferred';

@Directive()
export abstract class DynamicPopupContainerComponent<T = void> {
    public readonly deferred: Deferred<T> = new Deferred<T>();
    public readonly promise: Promise<T> = this.deferred.promise as Promise<T>;

    protected async apply(value?: T): Promise<void> {
        if (this.deferred?.resolve) {
            this.deferred?.resolve(value);
        }
    }

    protected async dismiss<R>(reason?: R): Promise<void> {
        if (this.deferred?.reject) {
            this.deferred?.reject(reason);
        }
    }
}

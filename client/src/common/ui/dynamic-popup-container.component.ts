import {ComponentRef, Directive} from '@angular/core';
import {Deferred} from '../util/Deferred';

@Directive()
export abstract class DynamicPopupContainerComponent<T = void> {
  public readonly deferred: Deferred<T> = new Deferred<T>();
  public readonly promise: Promise<T> = this.deferred.promise as  Promise<T>;
  public componentRef: ComponentRef<DynamicPopupContainerComponent<T>> | undefined = undefined;

  protected async apply(value?: T): Promise<void> {
    if (this.deferred?.resolve) {
      this.deferred?.resolve(value);
    }
  }

  protected async dismiss<R>(reason?: R): Promise<void> {
    if (this.deferred?.reject) {
      this.deferred?.reject(reason);
    }
    this.destroy();
  }

  protected destroy(): void {
    this.componentRef?.destroy();
  }
}

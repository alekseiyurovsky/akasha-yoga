import {
  ApplicationRef,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  NgZone,
  StaticProvider,
  Type, ViewContainerRef
} from '@angular/core';
import {DynamicPopupContainerComponent} from './ui/dynamic-popup-container.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  private rootViewContainer: ViewContainerRef | undefined = undefined;

  constructor(
    private applicationRef: ApplicationRef,
    private injector: Injector,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
  }

  setRootViewContainerRef(viewContainerRef: ViewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  public create<T extends DynamicPopupContainerComponent<C>, C = void>(component: Type<T>): T {
    console.log('here');
    const componentFactory: ComponentFactory<T> = this.componentFactoryResolver.resolveComponentFactory<T>(component);
    const containerComponentRef: ComponentRef<T> = componentFactory.create((this.rootViewContainer as ViewContainerRef).parentInjector);
    const popup: T = containerComponentRef.instance;
    popup.componentRef = containerComponentRef;
    this.applicationRef.attachView(containerComponentRef.hostView);
    return popup;
  }
}

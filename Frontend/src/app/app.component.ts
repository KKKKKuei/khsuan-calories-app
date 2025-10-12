import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NavigationService } from './service/navigation.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {

    constructor(public ns: NavigationService) {

     }

    ngOnInit() {
        this.ns.navigateWithParams('/login', {});
    }

}

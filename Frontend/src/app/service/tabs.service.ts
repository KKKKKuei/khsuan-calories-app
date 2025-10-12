import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TabsService {

    private selectTabSource = new Subject<{ tab: string }>();

    selectTab$ = this.selectTabSource.asObservable();

    //跳轉tabs  -> this.tabsService.requestSelect('setting');

    requestSelect(tab: string) {
        this.selectTabSource.next({ tab });
    }

}

import { Component, ViewChild } from '@angular/core';
import { IonContent, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search, gridOutline, fastFoodOutline, moonOutline, settingsOutline, calendarOutline } from 'ionicons/icons';
import { DashboardPage } from '../dashboard/dashboard.page';
import { FoodPage } from '../food/food.page';
import { HistoryPage } from "../history/history.page";
import { SettingPage } from "../setting/setting.page";
import { Subscription } from 'rxjs';
import { TabsService } from 'src/app/service/tabs.service';


@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    imports: [IonContent, IonIcon, IonTab, IonTabBar, IonTabButton, IonTabs, DashboardPage, FoodPage, HistoryPage, SettingPage],
})
export class TabsPage {

    @ViewChild('tabs', { static: true }) tabs!: IonTabs;
    private sub!: Subscription;

    constructor(private tabsService: TabsService) {
        addIcons({ library, playCircle, radio, search, gridOutline, fastFoodOutline, moonOutline, settingsOutline, calendarOutline });
    }

    ngOnInit() {
        //切tab
        this.sub = this.tabsService.selectTab$.subscribe(({ tab }) => {
            this.tabs.select(tab);
        });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

}

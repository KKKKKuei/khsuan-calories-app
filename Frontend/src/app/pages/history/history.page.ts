import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, IonAccordionGroup, IonAccordion, IonItem, IonButton, IonLabel } from '@ionic/angular/standalone';
import { asyncScheduler } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { DataService } from 'src/app/service/data.service';
import { NavigationService } from 'src/app/service/navigation.service';
import { TabsService } from 'src/app/service/tabs.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
    standalone: true,
    imports: [IonLabel, IonButton, IonItem, IonAccordion, IonAccordionGroup, IonDatetime, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {

    constructor(private ds: DataService, public ns: NavigationService, private cms: CommonService) { }

    today = new Date();
    maxDate = '';
    mealTypeList: string[] = [];
    highlightedDates = [
        {
            date: '2025-10-17',
            textColor: '#800080',
            backgroundColor: '#ffc0cb',
            border: '1px solid #e91e63',
        },
        {
            date: '2023-01-10',
            textColor: '#09721b',
            backgroundColor: '#c8e5d0',
            border: '1px solid #4caf50',
        },
        {
            date: '2023-01-20',
            textColor: 'var(--ion-color-secondary)',
            backgroundColor: 'rgb(var(--ion-color-secondary-rgb), 0.18)',
            border: '1px solid var(--ion-color-secondary-shade)',
        },
        {
            date: '2023-01-23',
            textColor: 'rgb(68, 10, 184)',
            backgroundColor: 'rgb(211, 200, 229)',
            border: '1px solid rgb(103, 58, 183)',
        },
    ];

    allMealList: any;
    selMealList: any = [];

    ngOnInit() {
        this.setMaxDate();

        this.ds.historyMealsDataSubject.subscribe(r => {
            this.allMealList = r;
            this.selMealList = this.allMealList.filter((a: any) => this.cms.isSameDay(new Date().toString(), a.consumedAt));
            this.accordionGroupDefaultOpen();
        });
    }

    setMaxDate() {
        const year = this.today.getFullYear();
        const month = (this.today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = this.today.getDate().toString().padStart(2, '0');
        this.maxDate = `${year}-${month}-${day}`;
    }

    datetimeChange(event: any) {
        this.selMealList = this.allMealList.filter((a: any) => this.cms.isSameDay(a.consumedAt, event.detail.value));
        this.accordionGroupDefaultOpen();
    }

    accordionGroupDefaultOpen() {
        asyncScheduler.schedule(() => {
            this.mealTypeList = [...this.selMealList.map((s: any) => s.mealType)];
        }, 10);
    }

}

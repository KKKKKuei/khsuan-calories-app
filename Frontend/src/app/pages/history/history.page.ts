import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonDatetime, IonAccordionGroup, IonAccordion, IonItem, IonLabel, IonProgressBar } from '@ionic/angular/standalone';
import { asyncScheduler } from 'rxjs';
import { CommonService } from 'src/app/service/common.service';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
    standalone: true,
    imports: [IonProgressBar, IonLabel, IonItem, IonAccordion, IonAccordionGroup, IonDatetime, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {

    constructor(private ds: DataService, public ns: NavigationService, private cms: CommonService, private hs: HttpService) { }

    today = new Date();
    todayString = '';
    mealTypeList: string[] = [];
    highlightedDates = [];
    showTdeeBar: boolean = false;

    allMealList: any;
    selMealList: any = [];
    allDailyCalories: any[] = [];
    selDailyCalories: any;

    selTdee: number = 0;
    selCalorieIntake: number = 0;
    calorieProgress: number = 0;

    ngOnInit() {
        this.setMaxDate();
        this.getOrUpdateAllDailyCalories();

        this.ds.historyMealsDataSubject.subscribe(r => {
            this.allMealList = r;
            this.datetimeChange(null, true);
        });

        this.ds.updateDailyForDashboardSubject.subscribe(r => {
            this.getOrUpdateAllDailyCalories();
            this.hs.getMeal(this.cms.user.userId).subscribe({
                next: (r) => {
                    this.allMealList = r;
                    this.datetimeChange(null, true);
                },
                error: (e) => {

                }
            });
        })
    }

    getOrUpdateAllDailyCalories() {
        this.hs.getAllDailyCalories(this.cms.user.userId).subscribe({
            next: (r: any) => {
                this.allDailyCalories = r;
                console.log('rrr', this.allDailyCalories)
                this.setHighlightedDates(this.allDailyCalories);
                this.datetimeChange(null, true);
            },
            error: (e) => {
                console.log('error', e);
            }
        });
    }

    setMaxDate() {
        const year = this.today.getFullYear();
        const month = (this.today.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed
        const day = this.today.getDate().toString().padStart(2, '0');
        this.todayString = `${year}-${month}-${day}`;
    }

    datetimeChange(event: any, init = false) {
        const date = init ? new Date().toString() : event.detail.value;
        this.selDailyCalories = this.allDailyCalories.filter(a => this.cms.isSameDay(a.recordDate, date))[0];
        if (this.selDailyCalories) {
            this.selCalorieIntake = this.selDailyCalories.calorieIntake;
            this.selTdee = this.selDailyCalories.tdee;
            this.calcTdeeBar();
            this.showTdeeBar = true;
        } else
            this.showTdeeBar = false;

        this.selMealList = this.allMealList.filter((a: any) => this.cms.isSameDay(a.consumedAt, date));
        this.accordionGroupDefaultOpen();
    }

    accordionGroupDefaultOpen() {
        asyncScheduler.schedule(() => {
            this.mealTypeList = [...this.selMealList.map((s: any) => s.mealType)];
        }, 10);
    }

    setHighlightedDates(data: any) {
        const highlightList: any = [];
        data.forEach((d: any) => {
            const obj = {
                date: d.recordDate,
                textColor: d.isDeficit ? '#09721b' : '#800080',
                backgroundColor: d.isDeficit ? '#c8e5d0' : '#ffc0cb',
                border: d.isDeficit ? '1px solid #4caf50' : '1px solid #e91e63'
            }
            highlightList.push(obj);
        });
        this.highlightedDates = highlightList;
    }

    calcTdeeBar() {
        this.calorieProgress = this.selCalorieIntake / this.selTdee;
    }


}


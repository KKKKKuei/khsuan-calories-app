import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    userId: number = JSON.parse(localStorage.getItem('user')!).id;

    isSameDay(dayString1: string, dayString2: string) { //判斷consumedAt 回傳是否同一天
        const day1 = new Date(dayString1);
        const day2 = new Date(dayString2);

        const isYearMatch = day1.getFullYear() === day2.getFullYear();
        const isMonthMatch = day1.getMonth() === day2.getMonth();
        const isDateMatch = day1.getDate() === day2.getDate();

        return isYearMatch && isMonthMatch && isDateMatch;
    };
}
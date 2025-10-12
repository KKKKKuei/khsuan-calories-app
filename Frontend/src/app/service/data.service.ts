import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor() { }

    public changeFoodTabsSubject = new Subject<string>();
    public selectedFoodToCustomSubject = new Subject<any>();
    public editMealDataSubject = new Subject<any>();
    public userDataSubject = new Subject<any>();
    public favoriteFoodDataSubject = new Subject<any>();
    private _foodListData: any;
    private _CompleteFoodData: any;
    private _MealTypeList: any;

    setFoodListData(data: any): void {
        this._foodListData = data;
    }

    getFoodListData(): any {
        return this._foodListData;
    }

    setCompleteFoodData(data: any): void {
        this._CompleteFoodData = data;
    }

    getCompleteFoodData(): any {
        return this._CompleteFoodData;
    }

    setMealTypeList(data: any): void {
        this._MealTypeList = data;
    }

    getMealTypeList(): any {
        return this._MealTypeList;
    }
}
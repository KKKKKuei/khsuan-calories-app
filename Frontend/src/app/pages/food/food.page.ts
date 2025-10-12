import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSegment, IonLabel, IonSegmentButton, IonSegmentView, IonSegmentContent } from '@ionic/angular/standalone';
import { FoodCustomPage } from "./food-custom/food-custom.page";
import { FoodDbPage } from "./food-db/food-db.page";
import { FoodAiPage } from "./food-ai/food-ai.page";
import { FoodFavoritePage } from "./food-favorite/food-favorite.page";
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'app-food',
    templateUrl: './food.page.html',
    styleUrls: ['./food.page.scss'],
    standalone: true,
    imports: [IonSegmentButton, IonLabel, IonSegment, CommonModule, FormsModule, IonSegment, IonSegmentView, IonSegmentContent, FoodCustomPage, FoodDbPage, FoodAiPage, FoodFavoritePage]
})
export class FoodPage implements OnInit {

    constructor(private ds: DataService) { }

    foodTabsValue: string = 'food-db';

    ngOnInit() {
        this.ds.changeFoodTabsSubject.subscribe((r: string) => {
            this.foodTabsValue = r;
        })
    }

    onTabsChange(event: any) {
        this.foodTabsValue = event.detail.value;
    }


}

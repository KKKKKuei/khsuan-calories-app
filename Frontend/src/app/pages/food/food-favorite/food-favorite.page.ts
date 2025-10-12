import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from 'src/app/service/data.service';
import { IonSearchbar, IonItem, IonList, IonIcon, IonPopover, IonContent } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/service/http.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
    selector: 'app-food-favorite',
    templateUrl: './food-favorite.page.html',
    styleUrls: ['./food-favorite.page.scss'],
    standalone: true,
    imports: [IonList, IonPopover, IonIcon, IonContent, IonItem, CommonModule, FormsModule]
})
export class FoodFavoritePage implements OnInit {

    @ViewChild('popover') popover!: HTMLIonPopoverElement;

    constructor(private ds: DataService, private hs: HttpService, private cms: CommonService) { }

    foodsData: any[] = [];
    favFoodsData: any[] = [];
    allMealType: string[] = [];
    selectedFood: any;

    user: any;
    isOpen = false;

    ngOnInit() {
        this.user = this.cms.getUser();

        this.ds.favoriteFoodDataSubject.subscribe(a => {
            this.foodsData = a;
            this.favFoodsData = this.foodsData.filter(f => f.favorite == 'Y');
        })
    }

    setOptionClick(event: Event, selectData: any) {
        this.allMealType = this.ds.getMealTypeList(); //更新mealtype到下拉選單
        this.selectedFood = selectData;

        const target = event.target as HTMLElement;

        if (target.closest('ion-icon[name="caret-down-circle-outline"]')) {
            this.presentPopover(event);
            return;
        }

        if (target.closest('ion-icon[name="heart"]')) {
            // this.handleHeartClick();
            return;
        }

    }

    clickOption(mealType: string, selectedFood: any) {
        this.isOpen = false;
        this.ds.editMealDataSubject.next({
            "mealType": mealType,
            "selectedFood": selectedFood,
        });
    }

    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;
    }

    clickCustom(selectedFood: any) {
        this.isOpen = false;
        this.ds.selectedFoodToCustomSubject.next(selectedFood);
        this.ds.changeFoodTabsSubject.next('food-custom');
    }

    clickFavorite(fd: any) {
        const obj = {
            userId: this.user.id,
            foodId: fd.foodId,
        };

        this.hs.toggleFavorite(obj).subscribe({
            next: (data: any) => { //# add or remove
                fd.favorite = data.message == 'add' ? 'Y' : 'N';
            }
        });
    }

}

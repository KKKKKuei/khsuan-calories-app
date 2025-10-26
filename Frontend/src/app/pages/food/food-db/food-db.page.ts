import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSearchbar, IonItem, IonList, IonIcon, IonPopover, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { heart, caretDownCircleOutline, heartOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
    selector: 'app-food-db',
    templateUrl: './food-db.page.html',
    styleUrls: ['./food-db.page.scss'],
    standalone: true,
    imports: [IonContent, IonPopover, IonIcon, IonList, IonSearchbar, CommonModule, FormsModule, IonItem]
})
export class FoodDbPage implements OnInit, AfterViewInit {

    constructor(private ds: DataService, private hs: HttpService, private cms: CommonService) {
        addIcons({ caretDownCircleOutline, heartOutline, heart });
    }

    @ViewChild('popover') popover!: HTMLIonPopoverElement;

    isOpen = false;
    allFoodsData: any[] = [];
    foodsData: any[] = [];
    favoriteFoods: any[] = [];
    selectedFood : any;
    allMealType: string[] = [];

    ngOnInit(): void {

        this.hs.getAllFoods().subscribe({
            next: (data: any) => {
                this.allFoodsData = data;
                this.foodsData = this.allFoodsData;

                this.ds.customFoodDataSubject.next(this.foodsData.filter(f => f.createdByUserId == this.cms.user.userId));
            }
        });

        this.hs.getFavoriteByUser(this.cms.user.userId).subscribe({
            next: (data: any) => {
                this.favoriteFoods = data.map((d: any) => d.foods);
                this.favoriteFoods.forEach(a => {
                    this.foodsData.filter(f => f.foodId == a.foodId)[0].favorite = 'Y';
                });

                this.ds.favoriteFoodDataSubject.next(this.foodsData);
            }
        });

    }

    ngAfterViewInit(): void {
    }


    handleInput(event: Event) {
        const target = event.target as HTMLIonSearchbarElement;
        const query = target.value?.toLowerCase() || '';
        this.foodsData = this.allFoodsData.filter((d) => d.toLowerCase().includes(query));
    }

    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;
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

    clickMealType(mealType: string, selectedFood: any) {
        this.isOpen = false;
        this.ds.editMealDataSubject.next({
            "mealType": mealType,
            "selectedFood": selectedFood,
        });
    }

    clickCustom(selectedFood: any) {
        this.isOpen = false;
        this.ds.selectedFoodToCustomSubject.next(selectedFood);
        this.ds.changeFoodTabsSubject.next('food-custom');
    }

    clickFavorite(fd: any) {
        const obj = {
            userId: this.cms.user.userId,
            foodId: fd.foodId,
        };

        this.hs.toggleFavorite(obj).subscribe({
            next: (data: any) => { //# add or remove
                fd.favorite = data.message == 'add' ? 'Y' : 'N';
            }
        });
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonItem, IonInput, IonContent, IonButton, IonIcon, IonPopover, IonList } from '@ionic/angular/standalone';
import { DataService } from 'src/app/service/data.service';
import { addIcons } from 'ionicons';
import { caretDownCircleOutline, heart, heartOutline } from 'ionicons/icons';
import { HttpService } from 'src/app/service/http.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
    selector: 'app-food-custom',
    templateUrl: './food-custom.page.html',
    styleUrls: ['./food-custom.page.scss'],
    standalone: true,
    imports: [IonList, IonPopover, IonButton, CommonModule, FormsModule, IonItem, IonInput, IonIcon, IonContent]
})
export class FoodCustomPage implements OnInit {


    @ViewChild('popover') popover!: HTMLIonPopoverElement;


    constructor(private ds: DataService, private hs: HttpService, private cms: CommonService) {
        addIcons({ caretDownCircleOutline, heartOutline, heart });
    }

    foods = [
        { name: '名稱*', field: 'name', value: '', placeholder: '請輸入名稱' },
        { name: '份量*', field: 'servingSize', value: '', placeholder: '請輸入份量' },
        { name: '熱量*', field: 'calories', value: '', placeholder: '請輸入熱量' },
        { name: '蛋白質', field: 'protein', value: '', placeholder: '請輸入蛋白質' },
        { name: '碳水', field: 'carbohydrates', value: '', placeholder: '請輸入碳水化合物' },
        { name: '脂肪', field: 'fat', value: '', placeholder: '請輸入脂肪' },
        { name: '纖維', field: 'fiber', value: '', placeholder: '請輸入纖維' },
    ];

    isOpen = false;
    customFoodsData: any[] = [];
    selectedFood: any;
    allMealType: string[] = [];

    ngOnInit() {
        this.ds.customFoodDataSubject.subscribe(r => {
            this.customFoodsData = r;
        });

        this.ds.selectedFoodToCustomSubject.subscribe(r => { //from clickCustom()
            this.foods.forEach(f => {
                switch (f.field) {
                    case 'name':
                        f.value = r.name;
                        break;
                    case 'servingSize':
                        f.value = r.servingSize;
                        break;
                    case 'calories':
                        f.value = r.calories;
                        break;
                    case 'protein':
                        f.value = r.protein;
                        break;
                    case 'carbohydrates':
                        f.value = r.carbs;
                        break;
                    case 'fat':
                        f.value = r.totalFat;
                        break;
                    case 'fiber':
                        f.value = r.fiber;
                        break;
                    default:
                        break;
                }
            })
        });
    }

    addCustom() {

    }

    clickClean() {
        this.foods.map(a => a.value = '');
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

    presentPopover(e: Event) {
        this.popover.event = e;
        this.isOpen = true;
    }

    clickFavorite(fd: any) {
        const obj = {
            userId: this.cms.userId,
            foodId: fd.foodId,
        };

        this.hs.toggleFavorite(obj).subscribe({
            next: (data: any) => { //# add or remove
                fd.favorite = data.message == 'add' ? 'Y' : 'N';
            }
        });
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
}

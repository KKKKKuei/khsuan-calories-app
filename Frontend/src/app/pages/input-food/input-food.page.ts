import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonPopover, IonList, IonItem, IonInput, IonLabel, IonToast, IonLoading, LoadingController } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/service/navigation.service';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-input-food',
    templateUrl: './input-food.page.html',
    styleUrls: ['./input-food.page.scss'],
    standalone: true,
    imports: [IonToast, IonLabel, IonInput, IonItem, IonList, IonPopover, IonButton, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule, IonPopover],
})
export class InputFoodPage implements OnInit {


    constructor(
        public ns: NavigationService,
        private route: ActivatedRoute,
        private ds: DataService,
        private loadingCtrl: LoadingController,
        private hs: HttpService,
    ) { }

    foodList: any;
    newFoodList: any = [
        {
            foodName: '',
            servingSize: '',
            servings: 1
        },
        {
            foodName: '',
            servingSize: '',
            servings: 1
        },
        {
            foodName: '',
            servingSize: '',
            servings: 1
        }
    ];

    toastObj: any = {
        checkRule: {
            isOpen: false,
            message: '',
            duration: 2000
        },
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => {
            this.foodList = this.ds.getFoodListData();
        });
    }

    addNewFoodList() {
        this.newFoodList.push({
            foodName: '',
            servingSize: '',
            servings: 1,
        });
    }

    removeNewFoodList(index: number) {
        this.newFoodList.splice(index, 1);
    }

    clickCalcBtn(newFoodList: any[]) {
        let isError = false;
        newFoodList.map((item: any, i) => {
            item.foodName = item.foodName.trim();
            item.servingSize = item.servingSize.trim();
            item.servings = _.isNumber(item.servings) && item.servings > 0 ? item.servings : 1;

            if ((item.foodName === '' && item.servingSize != '') || (item.foodName != '' && item.servingSize === '')) {
                this.toastObj.checkRule.isOpen = true;
                this.toastObj.checkRule.message = `第${i + 1}筆資料請完整填寫`;
                isError = true;
                return;
            }

        });

        if (isError)
            return;

        newFoodList = newFoodList.filter(item => item.foodName !== '' && item.servingSize !== '');

        // const processNewFoodList = newFoodList.map(food => ` 食物：${food.foodName}，份量：${food.servingSize} ||`).join('\n').slice(0, -3);
        const processNewFoodList = newFoodList.map(food => `   - ${food.foodName}（${food.servingSize}）`).join('\n');

        this.showLoading(true);

        this.hs.fortest_getFoodsData(processNewFoodList).subscribe({ //AI GO
            next: (data: any) => {
                data = [
                    {
                        "name": "火腿蛋餅",
                        "servingSize": "1份",
                        "calories": 150,
                        "protein": 15,
                        "carbohydrates": 30,
                        "fat": 8,
                        "fiber": 1,
                        "sugar": 5,
                        "saturatedFat": 3,
                        "sodium": 50,
                        "dataSource": "HealthyFoodHub.com",
                        "updatedAt": "2024-01-15"
                    },
                    {
                        "name": "香蕉",
                        "servingSize": "1根",
                        "calories": 89,
                        "protein": 1.6,
                        "carbohydrates": 27,
                        "fat": 0.4,
                        "fiber": 2,
                        "sugar": 14,
                        "saturatedFat": 0.1,
                        "sodium": 24,
                        "dataSource": "NutritionFacts.org",
                        "updatedAt": "2024-01-15"
                    }
                ];

                this.ds.setCompleteFoodData(data);
                this.ns.navigateWithParams('/tabs', {});
            },
            error: (error: any) => {
            }
        });



    }

    async showLoading(show: boolean) {
        const loading = await this.loadingCtrl.create({
            message: '計算中...',
            spinner: 'bubbles',
            duration: 3000,
        });

        show ? loading.present() : loading.dismiss();
    }

}

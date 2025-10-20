import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonProgressBar } from '@ionic/angular/standalone';
import { DataService } from 'src/app/service/data.service';
import { TabsService } from 'src/app/service/tabs.service';
import { HttpService } from 'src/app/service/http.service';
import { CommonService } from 'src/app/service/common.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.page.html',
    styleUrls: ['./dashboard.page.scss'],
    standalone: true,
    imports: [IonProgressBar, IonButton, IonItem, CommonModule, FormsModule, IonLabel, IonAccordion, IonAccordionGroup]
})
export class DashboardPage implements OnInit {

    constructor(
        private ds: DataService,
        private ts: TabsService,
        private hs: HttpService,
        private cms: CommonService
    ) { }

    user: any;
    editTimeout: any = null;
    calorieProgress: number = 0;
    tdee: number = 1500; //計算熱量赤字
    calorieIntake: number = 0;

    foodList: any = {
        meals: [
            {
                mealType: '早餐',
                foods: [
                    // { name: '蘋果', calories: 95, protein: 0.5, carbohydrates: 25, fat: 0.3, fiber: 4.4, sugar: 19, saturatedFat: 0.1, sodium: 1 },
                    // { name: '香蕉', calories: 105, protein: 1.3, carbohydrates: 27, fat: 0.3, fiber: 3.1, sugar: 14, saturatedFat: 0.1, sodium: 1 },
                    // { name: '雞蛋', calories: 78, protein: 6, carbohydrates: 0.6, fat: 5, fiber: 0, sugar: 0.6, saturatedFat: 1.6, sodium: 62 },
                ],
                totalCalories: 0,
                totalProtein: 0
            },
            {
                mealType: '午餐',
                foods: [],
                totalCalories: 0,
                totalProtein: 0
            },
            {
                mealType: '晚餐',
                foods: [],
                totalCalories: 0,
                totalProtein: 0
            },
        ],
        mealTypeList: [],
    };

    ngOnInit() {

        this.hs.getMeal(this.cms.userId).subscribe({
            next: r => {
                const data: any = r;

                if (data && data.length > 0) {
                    this.ds.historyMealsDataSubject.next(data);
                    data.forEach((d: any) => {
                        const todayMeal = this.foodList.meals.filter((m: any) => m.mealType == d.mealType && this.cms.isSameDay(new Date().toString(), d.consumedAt));
                        if (todayMeal.length > 0)
                            todayMeal[0].foods = d.items.map((m: any) => m.foods);
                    });
                }

                this.foodList.meals.forEach((m: any) => {
                    //計算全部總卡路里蛋白質
                    m.totalCalories = this.calcTotal(m.foods, 'calories');
                    m.totalProtein = this.calcTotal(m.foods, 'protein');
                });
                this.calorieIntake = this.calcTotal(this.foodList.meals, 'totalCalories');
                this.calcTdeeBar();

            },
            error: e => {

            }
        })

        this.foodList.mealTypeList = this.foodList.meals.map((m: any) => m.mealType);  //default open accordion

        this.ds.setMealTypeList(this.foodList.meals.map((m: any) => m.mealType)); //給food頁的 食物option

        // this.route.queryParams.subscribe(params => {
        //     // 取得ai傳來的資料
        //     const data = this.ds.getCompleteFoodData();
        //     if (data && data.length > 0) {
        //         const fl = this.foodList.meals.filter(m => m.mealType == this.ds.getFoodListData().mealType)[0];
        //         fl.foods.push(...data);
        //         fl.totalCalories = fl.foods.reduce((sum, food) => sum + (food.calories || 0), 0);
        //         // fl.totalProtein = fl.foods.reduce((sum, food) => sum + (food.protein || 0), 0);
        //     }
        // });

        this.ds.editMealDataSubject.subscribe(r => {
            const meal = this.foodList.meals.filter((m: any) => m.mealType == r.mealType)[0];
            meal.foods.push(r.selectedFood);
            meal.totalCalories = this.calcTotal(meal.foods, 'calories');
            meal.totalProtein = this.calcTotal(meal.foods, 'protein');

            //計算全部meal熱量
            this.calorieIntake = this.calcTotal(this.foodList.meals, 'totalCalories');
            this.calcTdeeBar();

            //後端防抖
            if (this.editTimeout) {
                clearTimeout(this.editTimeout);
            }
            this.editTimeout = setTimeout(() => {
                const meal = this.foodList.meals.filter((m: any) => m.mealType == r.mealType)[0];
                this.saveMeal(meal);
            }, 5000);

        })

    }

    addToMeal(foodList: any) {
        // this.ds.setFoodListData(foodList);
        // this.ns.navigateWithParams('/tabs/testt', {});

        this.ts.requestSelect('food');
    }

    calcTotal(arr: any, column: string) {
        const sum = arr.map((f: any) => f[column]).reduce((accumulator: any, currentValue: any) => {
            return accumulator + currentValue;
        }, 0);
        return sum;
    }

    calcTdeeBar() {
        this.calorieProgress = this.calorieIntake / this.tdee;
    }

    saveMeal(meal: any) {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const formattedMonth = month < 10 ? `0${month}` : `${month}`;
        const formattedDay = day < 10 ? `0${day}` : `${day}`;
        const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;


        // let arr: any = [];
        // meals.forEach((m: any) => {
        //     arr.push({
        //         "userId": this.cms.userId,
        //         "mealType": m.mealType,
        //         "consumedAt": formattedDate,
        //         "items": m.foods.forEach((f: any) => {
        //             return {
        //                 "foodId": f.foodId,
        //                 "quantity": f.servingSize
        //             }
        //         })
        //     })
        // });

        const arr: any = [];

        meal.foods.forEach((f: any) => {
            arr.push({
                "foodId": f.foodId,
                "quantity": f.servingSize
            })
        });

        const obj = {
            "userId": this.cms.userId,
            "mealType": meal.mealType,
            "consumedAt": formattedDate,
            "items": arr
        };


        this.hs.editMeal(obj).subscribe({
            next: (response) => {
                console.log('餐點更新成功', response);
            },
            error: (error) => {
                console.error('餐點更新失敗', error);
            }
        });
    }


}

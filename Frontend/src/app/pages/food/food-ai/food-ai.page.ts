import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonInput, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { HttpService } from 'src/app/service/http.service';

@Component({
    selector: 'app-food-ai',
    templateUrl: './food-ai.page.html',
    styleUrls: ['./food-ai.page.scss'],
    standalone: true,
    imports: [IonIcon, IonButton, IonItem, IonInput, CommonModule, FormsModule]
})
export class FoodAiPage implements OnInit {

    constructor(private hs: HttpService) { }

    aiFoodName: string = '火腿蛋餅';
    aiServingSize: string = '一份';

    foodList: any[] = [];

    ngOnInit() {
    }

    aiBtnClick() {
        //先做欄位檢查

        const obj = {
            'foodName': this.aiFoodName,
            'servingSize': this.aiServingSize,
        };

        this.hs.getAiDataForFood(obj).subscribe({
            next: (result) => {
                result = [
                    {
                        "name": "火腿蛋餅",
                        "servingSize": "1份",
                        "calories": 250,
                        "protein": 15,
                        "carbohydrates": 30,
                        "fat": 10,
                        "fiber": 2,
                        "sugar": 5,
                        "saturatedFat": 4,
                        "sodium": 70,
                        "dataSource": "衛福部食品營養資料庫",
                        "updatedAt": "2024-01-15"
                    },
                    {
                        "name": "火腿蛋餅",
                        "servingSize": "1份",
                        "calories": 250,
                        "protein": 15,
                        "carbohydrates": 30,
                        "fat": 10,
                        "fiber": 2,
                        "sugar": 5,
                        "saturatedFat": 4,
                        "sodium": 70,
                        "dataSource": "衛福部食品營養資料庫",
                        "updatedAt": "2024-01-15"
                    }
                ];

                this.aiFoodName = '';
                this.aiServingSize = '';
                this.foodList = [];
                this.foodList = this.foodList.concat(result);
            },
            error: (err) => {

            },
        })
    }

}

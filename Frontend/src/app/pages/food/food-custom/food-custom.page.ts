import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { DataService } from 'src/app/service/data.service';

@Component({
    selector: 'app-food-custom',
    templateUrl: './food-custom.page.html',
    styleUrls: ['./food-custom.page.scss'],
    standalone: true,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FoodCustomPage implements OnInit {

    constructor(private ds: DataService) { }

    ngOnInit() {
        this.ds.selectedFoodToCustomSubject.subscribe(r => {
        })
    }

}

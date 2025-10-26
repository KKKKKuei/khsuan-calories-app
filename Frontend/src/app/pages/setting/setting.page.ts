import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonToggle, IonInput, IonButton, IonItem, IonDatetimeButton, IonModal, IonDatetime } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/service/common.service';
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { TabsService } from 'src/app/service/tabs.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
    standalone: true,
    imports: [IonDatetime, IonModal, IonDatetimeButton, IonItem, IonButton, IonInput, IonIcon, IonToolbar, CommonModule, FormsModule, IonToggle]
})
export class SettingPage implements OnInit {

    constructor(private hs: HttpService, private cms: CommonService) { }


    paletteToggle = true;

    //** update user */
    username: string = '';
    height: string = '';
    weight: string = '';
    birthDate: String = '';
    activityLevel: string = '';

    showDatePop: boolean = true;

    ngOnInit() {
        //** dark mode */
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.initializeDarkPalette(prefersDark.matches);

        this.username = this.cms.user.username;
        this.height = this.cms.user.height;
        this.weight = this.cms.user.weight;
        this.birthDate = this.cms.user.birthDate;
        this.activityLevel = this.cms.user.activityLevel;
    }

    clickUpdateUser() {
        const user = {
            userId: this.cms.user.userId,
            username: this.username == '' ? null : this.username,
            height: this.height == '' ? null : this.height,
            weight: this.weight == '' ? null : this.weight,
            birthDate: this.birthDate == '' ? null : this.birthDate,
            activityLevel: this.activityLevel == '' ? null : this.activityLevel,
        };
        this.hs.updateUser(user).subscribe({
            next: (res) => {
                console.log(res)
            },
            error: (e) => {

            }
        })
    }

    initializeDarkPalette(isDark: boolean) {
        this.paletteToggle = isDark;
        this.toggleDarkPalette(isDark);
    }

    toggleChange(event: CustomEvent) {
        this.toggleDarkPalette(event.detail.checked);
    }

    toggleDarkPalette(shouldAdd: boolean) {
        document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
    }

}

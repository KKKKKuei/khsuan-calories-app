import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonToggle } from '@ionic/angular/standalone';
import { CommonService } from 'src/app/service/common.service';
import { DataService } from 'src/app/service/data.service';
import { TabsService } from 'src/app/service/tabs.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.page.html',
    styleUrls: ['./setting.page.scss'],
    standalone: true,
    imports: [IonIcon, IonToolbar, CommonModule, FormsModule, IonToggle]
})
export class SettingPage implements OnInit {

    constructor(
    ) { }


    user: any = {}; // id, email, username


    paletteToggle = true;

    ngOnInit() {
        //## dark mode
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        this.initializeDarkPalette(prefersDark.matches);
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

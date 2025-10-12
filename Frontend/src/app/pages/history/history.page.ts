import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/service/navigation.service';
import { TabsService } from 'src/app/service/tabs.service';

@Component({
    selector: 'app-history',
    templateUrl: './history.page.html',
    styleUrls: ['./history.page.scss'],
    standalone: true,
    imports: [IonDatetime, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {

    constructor(private router: Router, public ns: NavigationService, private ts: TabsService) { }

    ngOnInit() {
    }


}

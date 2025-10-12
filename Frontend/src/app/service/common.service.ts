import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor() { }

    getUser() {
        return JSON.parse(localStorage.getItem('user')!);
    }

}
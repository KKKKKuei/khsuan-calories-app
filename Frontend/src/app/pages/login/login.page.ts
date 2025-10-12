import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { DataService } from 'src/app/service/data.service';
import { HttpService } from 'src/app/service/http.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    imports: [IonTitle, IonInput, IonCard, IonButton, IonItem, IonCardContent, IonHeader, IonLabel, IonContent, IonToolbar, FormsModule],
})
export class LoginPage {
    credentials = {
        email: 'aaa',
        password: 'aaaaaa'
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private ns: NavigationService,
        private hs: HttpService,
        private ds: DataService
    ) { }

    async login() {
        if (!this.credentials.email || !this.credentials.password) {
            this.showAlert('錯誤', '請填寫所有欄位');
            return;
        }

        const loading = await this.loadingCtrl.create({
            message: '登入中...'
        });
        await loading.present();

        try {
            const loginData = {
                email: this.credentials.email,
                password: this.credentials.password
            };

            this.hs.login(loginData).subscribe({
                next: (res: any) => {
                    loading.dismiss();
                    localStorage.setItem('token', res.token);
                    localStorage.setItem('user', JSON.stringify(res.user));
                    this.router.navigate(['/tabs']);
                },
                error: (e) => {
                    loading.dismiss();
                    this.showAlert('錯誤', e.error?.message || '登入失敗');
                }
            })

        } catch (error) {
            loading.dismiss();
            this.showAlert('錯誤', '登入過程發生錯誤');
        }
    }

    private async showAlert(header: string, message: string) {
        const alert = await this.alertCtrl.create({
            header,
            message,
            buttons: ['確定']
        });
        await alert.present();
    }

    goToRegister() {
        this.ns.navigateWithParams('/register', {});
    }

}
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { IonButton, IonCard, IonCardContent, IonContent, IonHeader, IonInput, IonItem, IonLabel, IonTitle, IonToolbar } from "@ionic/angular/standalone";
import { error } from 'console';
import { HttpService } from 'src/app/service/http.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
    imports: [IonTitle, IonToolbar, IonButton, IonInput, IonLabel, IonItem, IonCard, IonCardContent, IonContent, IonHeader, FormsModule],
})
export class RegisterPage {
    user = {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    };

    constructor(
        private http: HttpClient,
        private router: Router,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private ns: NavigationService,
        private hs: HttpService
    ) { }

    async register() {
        // 基本驗證
        if (!this.user.email || !this.user.username || !this.user.password) {
            this.showAlert('錯誤', '請填寫所有欄位');
            return;
        }

        if (this.user.password !== this.user.confirmPassword) {
            this.showAlert('錯誤', '密碼確認不一致');
            return;
        }

        if (this.user.password.length < 6) {
            this.showAlert('錯誤', '密碼長度至少6位');
            return;
        }

        const loading = await this.loadingCtrl.create({
            message: '註冊中...'
        });
        await loading.present();

        try {
            const registerData = {
                email: this.user.email,
                username: this.user.username,
                password: this.user.password
            };

            // 發送註冊請求
            this.hs.register(registerData).subscribe({
                next: (res) => {
                    loading.dismiss();
                    this.showAlert('成功', '註冊成功，請登入');
                    this.router.navigate(['/login']);
                },
                error: (e) => {
                    loading.dismiss();
                    this.showAlert('錯誤', e.error?.message || '註冊失敗');
                }
            })

        } catch (error) {
            loading.dismiss();
            this.showAlert('錯誤', '註冊失敗');
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

    goToLogin() {
        this.ns.navigateWithParams('/login', {});
    }

}
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor() { }

    private apiUrl = 'http://192.168.0.13:8080/api';
    private http = inject(HttpClient);

    private getHeaders(contentTpye?: string): HttpHeaders {
        const token = localStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': contentTpye ? contentTpye : 'application/json',
            'Authorization': `Bearer ${token}`
        });
    }

    private handleError(error: HttpErrorResponse) {
        let errorMessage = '發生未知錯誤！';
        if (error.error instanceof ErrorEvent) {
            errorMessage = `錯誤: ${error.error.message}`;
        } else {
            errorMessage = `錯誤代碼: ${error.status}\n訊息: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }

    getAllFoods() {
        const url = `${this.apiUrl}/getAllFoods`;
        return this.http.get(url, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    getFoodsData(foodsString: any) {
        const url = `${this.apiUrl}/getFoodsData`;
        return this.http.post(url, foodsString, { headers: this.getHeaders('text/plain') })
            .pipe(
                catchError(this.handleError)
            );
    }

    fortest_getFoodsData(foodsString: any) {
        const url = `${this.apiUrl}/fortest`;
        const headers = new HttpHeaders({ 'Content-Type': 'text/plain' });

        return this.http.get(url, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
    }

    getAiDataForFood(obj: any) {
        const url = `${this.apiUrl}/fortest`;
        // const url = `${this.apiUrl}/getAiDataForFood`;

        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    register(obj: any) {
        const url = `${this.apiUrl}/auth/register`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    login(obj: any) {
        const url = `${this.apiUrl}/auth/login`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    updateUser(obj: any) {
        const url = `${this.apiUrl}/user/updateUser`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }


    getMeal(userId: number) {
        const url = `${this.apiUrl}/meals/getMealsByUser`;
        return this.http.post(url, userId, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    editMeal(obj: any) {
        const url = `${this.apiUrl}/meals/editMeal`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    //** favorites */
    getFavoriteByUser(userId: number) {
        const url = `${this.apiUrl}/favorites/getFavorite`;
        return this.http.post(url, userId, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    toggleFavorite(obj: any) {
        const url = `${this.apiUrl}/favorites/toggle`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    //** daily-calories */
    getAllDailyCalories(userId: number) {
        const url = `${this.apiUrl}/daily-calories/getAllCaloriesByUser`;
        return this.http.post(url, userId, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    calculateTDEE(obj: any) {
        const url = `${this.apiUrl}/daily-calories/calculateTDEE`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

    addDailyCalories(obj: any) {
        const url = `${this.apiUrl}/daily-calories/save`;
        return this.http.post(url, obj, { headers: this.getHeaders() })
            .pipe(
                catchError(this.handleError)
            );
    }

}
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

export interface NavigationOptions {
    page: string;
    params?: Record<string, any>;
    replaceUrl?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private router: Router) { }

    //跳轉頁面 非tabs  ->   this.ns.navigateWithParams('/input-food', {});

    /**
     * 通用導航方法
     */
    navigateTo(options: NavigationOptions): void {
        const navigationExtras = {
            queryParams: options.params,
            replaceUrl: options.replaceUrl || false
        };

        this.router.navigate([options.page], navigationExtras);
    }

    /**
     * 導航到儀表板
     */
    navigateToDashboard(params?: Record<string, any>): void {
        this.navigateTo({
            page: '/dashboard',
            params: params
        });
    }

    /**
     * 帶參數導航（通用）
     */
    navigateWithParams(page: string, params: Record<string, any>): void {
        this.navigateTo({
            page: page,
            params: params
        });
    }

    /**
     * 返回上一頁
     */
    navigateBack(): void {
        this.router.navigate(['/']);
    }

    /**
     * 替換當前頁面（無返回）
     */
    navigateWithReplace(page: string, params?: Record<string, any>): void {
        this.navigateTo({
            page: page,
            params: params,
            replaceUrl: true
        });
    }

    /**
     * 獲取當前路由參數
     */
    getCurrentParams(): any {
        // 實際實現需要注入 ActivatedRoute
        return {};
    }
}
import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
    },
    {
        path: 'tabs',
        loadComponent: () => import('./pages/tabs/tabs.page').then((m) => m.TabsPage),
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.page').then(m => m.DashboardPage)
    },
    {
        path: 'food',
        loadComponent: () => import('./pages/food/food.page').then(m => m.FoodPage)
    },
    {
        path: 'setting',
        loadComponent: () => import('./pages/setting/setting.page').then(m => m.SettingPage)
    },
    {
        path: 'history',
        loadComponent: () => import('./pages/history/history.page').then(m => m.HistoryPage)
    },
    {
        path: 'input-food',
        loadComponent: () => import('./pages/input-food/input-food.page').then(m => m.InputFoodPage)
    },
    {
        path: 'food-db',
        loadComponent: () => import('./pages/food/food-db/food-db.page').then(m => m.FoodDbPage)
    },
    {
        path: 'food-ai',
        loadComponent: () => import('./pages/food/food-ai/food-ai.page').then(m => m.FoodAiPage)
    },
    {
        path: 'food-custom',
        loadComponent: () => import('./pages/food/food-custom/food-custom.page').then(m => m.FoodCustomPage)
    },
    {
        path: 'food-favorite',
        loadComponent: () => import('./pages/food/food-favorite/food-favorite.page').then(m => m.FoodFavoritePage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then(m => m.RegisterPage)
    },


];

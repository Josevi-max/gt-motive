import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./features/home/home-routing.module').then(m => m.HOME_ROUTES)
    },
    {
        path: 'brand',
        loadChildren: () => import('./features/brand-details/brand-details-routing.module').then(m => m.BRAND_DETAILS_ROUTES)
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    },

];

import { Routes } from '@angular/router';
import { loadBrandsDetailsResolver } from './resolvers/brand-details.resolver';
export const BRAND_DETAILS_ROUTES: Routes = [
    {
        path: ':brandId/information',
        loadComponent: () => import('./presentation/details/details').then(m => m.Details),
        resolve: {
            brandDetails: loadBrandsDetailsResolver
        }
    },
     {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];

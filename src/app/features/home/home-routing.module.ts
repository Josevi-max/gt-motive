import {  Routes } from '@angular/router';
import { loadBrandsResolver } from './resolvers/home.resolver';
export const HOME_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/home/home').then(m => m.Home),
        resolve: {
          brands: loadBrandsResolver
        }
      },
    ]
  }
];

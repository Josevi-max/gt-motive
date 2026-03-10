import {  Routes } from '@angular/router';
export const HOME_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./presentation/home/home').then(m => m.Home),
      },
    ]
  }
];

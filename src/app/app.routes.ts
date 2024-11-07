import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '**', // Wildcard route for a 404 page, if needed
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

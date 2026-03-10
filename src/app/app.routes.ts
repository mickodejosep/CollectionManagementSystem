import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent)
      },
      {
        path: 'collections',
        loadComponent: () => import('./pages/collections/collections.component').then((m) => m.CollectionsComponent)
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

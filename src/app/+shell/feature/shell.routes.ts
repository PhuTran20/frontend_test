import { Routes } from '@angular/router';

export const shellRoutes: Routes = [
  {
    path: '',
    redirectTo: '/form',
    pathMatch: 'full',
  },
  {
    path: 'form',
    canActivate: [],
    loadChildren: () => import('../../+form/form.routes'),
  },
  {
    path: '404',
    loadChildren: () => import('../../shared/ui/page/404/page-404.routes'),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];

import { loadRemoteModule } from '@angular-architects/native-federation';
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
    path: 'child',
    loadComponent: () =>
      loadRemoteModule('micro-frontend-child', './Component').then(
        (m) => m.AppComponent
      ),
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

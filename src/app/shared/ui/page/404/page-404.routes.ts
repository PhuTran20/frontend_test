import { Route } from '@angular/router';

const PAGE404_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./page-404.component').then((m) => m.Page404Component),
  },
];
export default PAGE404_ROUTES;

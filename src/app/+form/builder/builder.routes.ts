import { Route } from '@angular/router';

const BUILDER_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/builder/builder.component').then(
        (m) => m.BuilderComponent
      ),
  },
];
export default BUILDER_ROUTES;

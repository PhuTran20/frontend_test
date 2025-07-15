import { Route } from '@angular/router';
import { LayoutComponent } from '../+shell/ui/layout.component';

const FORM_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'builder',
      },
      {
        path: 'builder',
        loadChildren: () => import('./builder/builder.routes'),
        data: { title: 'Form Builder' },
      },
      {
        path: 'answers',
        loadChildren: () => import('./answers/answers.routes'),
        data: { title: 'Answers' },
      },
    ],
  },
];
export default FORM_ROUTES;

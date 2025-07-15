import { Route } from '@angular/router';

const ANSWERS_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./feature/answers.component').then((m) => m.AnswersComponent),
  },
];
export default ANSWERS_ROUTES;

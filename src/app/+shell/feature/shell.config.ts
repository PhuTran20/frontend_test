import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { shellRoutes } from './shell.routes';
import { interceptors } from '../../shared/utils/interceptor/interceptors';

registerLocaleData(en);

export const shellConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(shellRoutes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withInterceptors([interceptors])),
    importProvidersFrom(FormsModule, BrowserAnimationsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};

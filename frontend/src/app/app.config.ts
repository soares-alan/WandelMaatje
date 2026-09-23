import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { LanguageService } from './core/services/language.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withInterceptors([errorInterceptor])),
    provideRouter(routes),
    provideTranslateService({
      loader: provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),
      lang: 'en',
      fallbackLang: 'en'
    }),
    provideAppInitializer(() => inject(LanguageService).init())
  ]
};

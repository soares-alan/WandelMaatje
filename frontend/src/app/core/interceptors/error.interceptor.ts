import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { catchError, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';
import { NotificationService } from '../services/notification.service';

const ERROR_TRANSLATION_KEYS: Readonly<Record<number, string>> = {
  0: 'errors.connectionError',
  400: 'errors.badRequest',
  401: 'errors.unauthorized',
  403: 'errors.forbidden',
  404: 'errors.notFound',
  409: 'errors.conflict',
  500: 'errors.serverError'
};

/** Turns API failures into one consistent, localized notification. */
export const errorInterceptor: HttpInterceptorFn = (request, next) => {
  if (!request.url.startsWith(environment.apiUrl)) {
    return next(request);
  }

  const notification = inject(NotificationService);
  const translate = inject(TranslateService);

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      const key = ERROR_TRANSLATION_KEYS[error.status] ?? 'errors.unexpected';
      notification.error(translate.instant(key));

      return throwError(() => error);
    })
  );
};

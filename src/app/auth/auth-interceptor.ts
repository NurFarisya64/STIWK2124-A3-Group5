import { HttpInterceptorFn } from '@angular/common/http';

// Credentials must match the Spring Security config on the backend.
const BASIC_AUTH_USERNAME = 'admin';
const BASIC_AUTH_PASSWORD = 'admin123';

/**
 * Intercepts all outgoing HTTP requests and attaches a Basic Auth header
 * to write operations (POST, PUT, DELETE). GET requests remain open/public.
 * Registered globally in app.config.ts via provideHttpClient(withInterceptors([...])).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const isWriteRequest =
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE';

  if (isWriteRequest) {
    const authToken = 'Basic ' + btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);

    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next(authReq);
  }

  return next(req);
};
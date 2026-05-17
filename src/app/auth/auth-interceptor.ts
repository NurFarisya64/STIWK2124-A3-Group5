import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const username = 'admin';
  const password = 'admin123';

  const isWriteRequest =
    req.method === 'POST' ||
    req.method === 'PUT' ||
    req.method === 'DELETE';

  if (isWriteRequest) {
    const authToken = 'Basic ' + btoa(`${username}:${password}`);

    const authReq = req.clone({
      setHeaders: {
        Authorization: authToken
      }
    });

    return next(authReq);
  }

  return next(req);
};
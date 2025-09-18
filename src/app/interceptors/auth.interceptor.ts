import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get stored userId from localStorage (or sessionStorage)
    const userId = localStorage.getItem('userId');

    if (userId) {
      // Clone request and add the header
      const cloned = req.clone({
        setHeaders: {
          'x-user-id': userId,
        },
      });
      return next.handle(cloned);
    }

    // If no userId, just forward the request
    return next.handle(req);
  }
}

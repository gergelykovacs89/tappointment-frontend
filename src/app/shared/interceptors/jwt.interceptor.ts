import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (currentUser && userToken) {
      request = request.clone({
        setHeaders: {
          'x-auth': `${userToken}`
        }
      });
    }
    return next.handle(request);
  }
}

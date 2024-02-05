import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const currentUser = this.authenticationService.currentUserValue;
    // const isLoggedIn = currentUser && currentUser.token;
    // const isApiUrl = request.url.startsWith(environment.apiUrl);

    const currentLoginInfo = this.authenticationService.getLoginInformation;
    // const isLoggedIn = currentUser && currentUser.authResult.token;
    const isLoggedIn = this.authenticationService.isLoggedIn;
    const isApiUrl = request.url.startsWith(environment.apiUrl);
    // console.log(request.url);
    // console.log(environment.apiUrl);
    //
    // console.log(isLoggedIn);
    // console.log(isApiUrl);
    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentLoginInfo.authResult.token}`
        }
      });
    }
    // if (environment.defaultauth === 'firebase') {
    //       // add authorization header with jwt token if available
    //       let currentUser = this.authenticationService.currentUser();
    //       if (currentUser && currentUser.token) {
    //           request = request.clone({
    //               setHeaders: {
    //                   Authorization: `Bearer ${currentUser.token}`,
    //               },
    //           });
    //       }
    //   } else {
    //       // add authorization header with jwt token if available
    //       const currentUser = this.authfackservice.currentUserValue;
    //       if (currentUser && currentUser.token) {
    //           request = request.clone({
    //               setHeaders: {
    //                   Authorization: `Bearer ${currentUser.token}`,
    //               },
    //           });
    //       }
    //   }
    return next.handle(request);
  }
}

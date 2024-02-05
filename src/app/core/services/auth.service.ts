import { Injectable } from '@angular/core';

import {BehaviorSubject, from, map, Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";
import {catchError} from "rxjs/operators";
import {RegionModel} from "../models/cityModel";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  userData: any;
  isLoggedIn = false;
  role: string;
  public currentUser: Observable<ApplicationUser>;
  private tokenKey = 'cesibon-token';
  // private profileKey = 'user-profile';
  private currentUserSubject: BehaviorSubject<ApplicationUser>;
  loggedInKey = 'cesibon-logged-in-info';
  userProfileKey = 'cesibon-user-profile';

  private loginInformationSubject: BehaviorSubject<CesibonLoginInformation>;
  public loginInformation: Observable<CesibonLoginInformation>;

  public currentUserProfileSubject: BehaviorSubject<ApplicationUser>;
  public currentProfile: Observable<ApplicationUser>;

  constructor(private readonly http: HttpClient,
              private router: Router) {
    this.loginInformationSubject = new BehaviorSubject<CesibonLoginInformation>(JSON.parse(localStorage.getItem(this.loggedInKey)));
    this.currentUserProfileSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem(this.userProfileKey)));
    this.loginInformation = this.loginInformationSubject.asObservable();
    this.currentProfile = this.currentUserProfileSubject.asObservable();
  }

  public get getLoginInformation(): CesibonLoginInformation {
    return this.loginInformationSubject.value;
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  public get getCurrentUserProfile(): ApplicationUser {
    return this.currentUserProfileSubject.value;
  }

  signinUser(email: string, password: string) {
    let url = `${environment.apiUrl}/${environment.identityUrl}/login`;
    return this.http.post<CesibonLoginInformation>(url, {email, password})
      .pipe(map(logInfo => {
        console.log(logInfo);
        this.loginInformationSubject.next(logInfo);
        this.currentUserProfileSubject.next(logInfo.userInfo);
        this.setLoginInfo(logInfo);
        this.setUserInfo(logInfo.userInfo);
        localStorage.setItem(this.tokenKey, logInfo.authResult.token);
        this.isLoggedIn = true;
        return logInfo;
      })).pipe( catchError(this.handleLoginError));
  }

  private handleLoginError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

  setLoginInfo(value) {
    localStorage.setItem(this.loggedInKey, JSON.stringify(value));
  }

  setUserInfo(value) {
    localStorage.setItem(this.userProfileKey, JSON.stringify(value));
  }

  logout() {
    localStorage.removeItem(this.loggedInKey);
    localStorage.removeItem(this.userProfileKey);
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false;
    this.router.navigate(['auth/login']);
  }

  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem(this.userProfileKey));
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  setLocalUserProfile(value) {
    localStorage.setItem(this.userProfileKey, JSON.stringify(value));
  }

  isAuthenticated() {
    this.getLocalStorageUser();
    return this.isLoggedIn;
  }

  registerEstateOwner(owner: EstateOwnerUser):Observable<number> {
    const fullUrl = `${environment.apiUrl}/${environment.identityUrl}/register-estate-owner`;
    return this.http.post<number>(fullUrl, owner);
  }
}

export interface ApplicationUser {
  id: number;
  userId: number;
  token: string;
  refreshToken: string;
  email: string;
  lastName: string;
  role: string;
  roleLabel: string;
  firstName: string;
  expiresIn: Date;
  isLoggedIn: boolean;
}

export class EstateOwnerUser {
  email: string;
  lastName: string;
  firstName: string;
  password: string;
}

export interface CesibonLoginInformation {
  authResult: AuthorizationResult;
  userInfo: ApplicationUser;
}

export interface AuthorizationResult {
  userId: number;
  token: string;
  refreshToken: string;
  email: string;
  role: string;
  lastName: string;
  firstName: string;
  expiresIn: Date;
  isLoggedIn: boolean;
}

import { Injectable } from '@angular/core';

import {BehaviorSubject, from, map, Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {environment} from "../../../environments/environment";


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  userData: any;
  isLoggedIn = false;
  public currentUser: Observable<ApplicationUser>;
  private tokenKey = 'cesibon-token';
  private profileKey = 'user-profile';
  private currentUserSubject: BehaviorSubject<ApplicationUser>;

  constructor(private readonly http: HttpClient,
              private router: Router,
              private store: Store<any>) {
    this.currentUserSubject = new BehaviorSubject<ApplicationUser>(JSON.parse(localStorage.getItem(this.profileKey)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): ApplicationUser {
    return this.currentUserSubject.value;
  }

  signinUser(email: string, password: string) {
    // , { withCredentials: true }
    return this.http.post<any>(`${environment.apiUrl}/${environment.identityUrl}/login`, {email, password})
      .pipe(map(user => {
        console.log(user);
        this.currentUserSubject.next(user);
        this.setLocalUserProfile(user);
        localStorage.setItem(this.tokenKey, user.token);
        this.isLoggedIn = true;
        this.store.dispatch({
          type: '[Log In] Perform Login'
        })
        return user;
      }));
  }

  logout() {
    localStorage.removeItem(this.profileKey);
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false;
    this.store.dispatch({
      type: '[Log Out] Perform Log Out'
    })
    this.router.navigate(['auth/login']);
  }

  getLocalStorageUser() {
    this.userData = JSON.parse(localStorage.getItem(this.profileKey));
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  setLocalUserProfile(value) {
    localStorage.setItem(this.profileKey, JSON.stringify(value));
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
  userId: number;
  token: string;
  refreshToken: string;
  email: string;
  lastName: string;
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

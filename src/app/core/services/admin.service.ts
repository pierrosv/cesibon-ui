import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ContactUs, EstateSimple} from "../models/cityModel";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getContactUsList(): Observable<ContactUs[]> {
    return this.http.get<ContactUs[]>(`${environment.apiUrl}/${environment.adminUrl}/contact-us`);
  }
}

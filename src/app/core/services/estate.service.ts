import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {EstateFull, EstateSimple} from "../models/cityModel";

@Injectable({
  providedIn: 'root'
})
export class EstateService {

  constructor(private http: HttpClient) { }

  getOwnerEstates(ownerId: number): Observable<EstateSimple[]> {
    return this.http.get<EstateSimple[]>(`${environment.apiUrl}/${environment.estateUrl}/get-owner-estates/${ownerId}`);
  }

  getEstateById(id: number): Observable<EstateFull> {
    return this.http.get<EstateFull>(`${environment.apiUrl}/${environment.estateUrl}/${id}`);
  }

  deleteEstateById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.estateUrl}/${id}`);
  }
}

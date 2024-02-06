import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {CityModel, EstateFull, EstateSimple} from "../models/cityModel";

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

  saveEstate(estate: EstateFull):Observable<EstateFull> {
    const fullUrl = `${environment.apiUrl}/${environment.estateUrl}/`;
    if (estate.id <= 0) {
      console.log(fullUrl);
      console.log(estate);
      return this.http.post<EstateFull>(fullUrl, estate);
    }
    return this.http.put<EstateFull>(fullUrl, estate);
  }

  deleteEstateById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.estateUrl}/${id}`);
  }
}

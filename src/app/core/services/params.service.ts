import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryModel} from "../models/country.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ParamsService {


  constructor(private http: HttpClient) { }

  getAllCountries(): Observable<CountryModel[]> {
    return this.http.get<CountryModel[]>(`${environment.apiUrl}/${environment.countryUrl}`);
  }

  getCountryById(id: number): Observable<CountryModel> {
    return this.http.get<CountryModel>(`${environment.apiUrl}/${environment.countryUrl}/${id}`);
  }

  deleteCountryById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.countryUrl}/${id}`);
  }

  saveCountry(location: CountryModel):Observable<CountryModel> {
    const fullUrl = `${environment.apiUrl}/${environment.countryUrl}/`;
    if (location.id <= 0) {
      return this.http.post<CountryModel>(fullUrl, location);
    }
    return this.http.put<CountryModel>(fullUrl, location);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CountryModel} from "../models/country.model";
import {environment} from "../../../environments/environment";
import {CityModel, RegionModel, SimplePoint} from "../models/cityModel";

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

  saveCountry(country: CountryModel):Observable<CountryModel> {
    const fullUrl = `${environment.apiUrl}/${environment.countryUrl}/`;
    if (country.id <= 0) {
      return this.http.post<CountryModel>(fullUrl, country);
    }
    return this.http.put<CountryModel>(fullUrl, country);
  }

  getAllCities(): Observable<CityModel[]> {
    return this.http.get<CityModel[]>(`${environment.apiUrl}/${environment.cityUrl}`);
  }

  getCityById(id: number): Observable<CityModel> {
    return this.http.get<CityModel>(`${environment.apiUrl}/${environment.cityUrl}/${id}`);
  }

  deleteCityById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.cityUrl}/${id}`);
  }

  saveCity(city: CityModel):Observable<CityModel> {
    const fullUrl = `${environment.apiUrl}/${environment.cityUrl}/`;
    if (city.id <= 0) {
      console.log(city);
      return this.http.post<CityModel>(fullUrl, city);
    }
    return this.http.put<CityModel>(fullUrl, city);
  }

  getAllRegions(): Observable<RegionModel[]> {
    return this.http.get<RegionModel[]>(`${environment.apiUrl}/${environment.regionUrl}`);
  }

  getRegionById(id: number): Observable<RegionModel> {
    return this.http.get<RegionModel>(`${environment.apiUrl}/${environment.regionUrl}/${id}`);
  }

  deleteRegionById(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/${environment.regionUrl}/${id}`);
  }

  saveRegion(region: RegionModel, newRegion: any):Observable<RegionModel> {
    console.log('saving Region');
    const points: SimplePoint[] = [];
    newRegion._latlngs[0].forEach(c => {
      points.push( new SimplePoint(c.lat, c.lng));
    });
    region.regionPoints = points;
    const fullUrl = `${environment.apiUrl}/${environment.regionUrl}/`;
    if (region.id <= 0) {
      return this.http.post<RegionModel>(fullUrl, region);
    }
    return this.http.put<RegionModel>(fullUrl, region);
  }

}

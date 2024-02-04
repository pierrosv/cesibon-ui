export class CityModel {
  id: number;
  inCountryId: number;
  countryName: string;
  name: string;
  center: SimplePoint;
  zoomLevel: number;
}
export class RegionModel {
  id: number;
  inCountryId: number;
  countryName: string;
  inCityId: number;
  cityName: string;
  name: string;
  regionPoints: SimplePoint[];
}

export class SimplePoint {
  constructor(public latitude: number, public longitude: number) {}
}


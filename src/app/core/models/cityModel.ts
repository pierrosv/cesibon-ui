export class CityModel {
  id: number;
  inCountryId: number;
  name: string;
}
export class RegionModel {
  id: number;
  inCountryId: number;
  inCityId: number;
  name: string;
  regionPoints: SimplePoint[];
}

export class SimplePoint {
  constructor(public latitude: number, public longitude: number) {}
}


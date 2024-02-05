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

export class EstateSimple {
  id: number;
  estateType: number;
  estateTypeName: string;
  estateStatus: number;
  estateStatusName: string;
  name: string;
  inRegionId: number;
  noOfRooms: number;
  inRegionName: string;
  mainImage: string;
}

export class EstateFull {
  id: number;
  estateType: number;
  estateTypeName: string;
  estateStatus: number;
  estateStatusName: string;
  name: string;
  inRegionId: number;
  noOfRooms: number;
  inRegionName: string;
  mainImage: string;
  coordinates: SimplePoint;
  images: string[];
  hasLivingRoom: boolean;
  hasDiningArea: boolean;
  hasParking: boolean;
  hasWifi: boolean;
  hasKitchen: boolean;
  hasKitchenEquipment: boolean;
  hasKitchenette: boolean;
  hasHeat: boolean;
  hasWashingMachine: boolean;
  hasPool: boolean;
  hasBbq: boolean;
  hasYard: boolean;
  hasGarden: boolean;
  hasView: boolean;
  hasHotWater: boolean;
  hasAirCondition: boolean;
}

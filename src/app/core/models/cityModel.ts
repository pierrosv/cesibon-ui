export class CityModel {
  id: number;
  inCountryId: number;
  countryName: string;
  name: string;
  center: SimplePoint;
  zoomLevel: number;
  weight: number;
}
export class RegionModel {
  id: number;
  inCountryId: number;
  dayWeight: number;
  monthWeight: number;
  winterSeasonWeight: number;
  summerSeasonWeight: number;
  yearWeight: number;
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
  rentalPeriodType: number;
  rentalPeriodTypeName: string;
  fromDate: Date;
  toDate: Date;
  name: string;
  inRegionId: number;
  noOfRooms: number;
  askingPrice: number;
  inRegionName: string;
  mainImage: string;
}

export class EstateFull {
  id: number;
  estateOwnerId: number;
  estateType: number;
  estateTypeName: string;
  estateStatus: number;
  estateStatusName: string;
  rentalPeriodType: number;
  rentalPeriodTypeName: string;
  fromDate: Date;
  toDate: Date;
  name: string;
  ownerNotes: string;
  adminNotes: string;
  inRegionId: number;
  noOfRooms: number;
  noOfInSuites: number;
  totalSquareMeters: number;
  askingPrice: number;
  inRegionName: string;
  mainImage: string;
  coordinates: SimplePoint;
  cityCenter: SimplePoint;
  cityZoom: number;
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

export class DataModel {
  id: number;
  name: string;
}
export const estateTypes: DataModel[]  = [
  {
    id: 10,
    name: 'LineStaff',
  },
  {
    id: 20,
    name: 'Shared',
  },
  {
    id: 30,
    name: 'Single',
  },
  {
    id: 40,
    name: 'Studio',
  },
  {
    id: 50,
    name: 'Floor',
  },
  {
    id: 60,
    name: 'Villa',
  }
]


export const rentalPeriodType: DataModel[] = [
  // {
  //   id: 10,
  //   name: 'Day',
  // },
  // {
  //   id: 20,
  //   name: 'Week',
  // },
  // {
  //   id: 30,
  //   name: 'Month',
  // },
  // {
  //   id: 40,
  //   name: 'Quarter',
  // },
  {
    id: 50,
    name: 'Season',
  },
  {
    id: 60,
    name: 'Year',
  }
]

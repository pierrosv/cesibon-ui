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
  totalSquareMeters: number;
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
  hasHeat: boolean;
  hasWashingMachine: boolean;
  hasPool: boolean;
  hasBbq: boolean;
  hasGarden: boolean;
  hasView: boolean;
  hasHotWater: boolean;
  hasAirCondition: boolean;
  rentForDay: boolean;
  rentForMonth: boolean;
  rentForWinterSeason: boolean;
  rentForSummerSeason: boolean;
  rentForYear: boolean;
  rentForCustomPeriod: boolean;
  askingPriceForDay: number;
  askingPriceForMonth: number;
  askingPriceForWinterSeason: number;
  askingPriceForSummerSeason: number;
  askingPriceForYear: number;
  askingPriceForCustomPeriod: number;
  rooms: RoomInfo[];
  houses: HouseInfo[];
}

export class HouseInfo {
  id: number;
  hasLivingRoom: boolean;
  hasDiningArea: boolean;
  hasKitchen: boolean;
  hasKitchenEquipment: boolean;
  hasHeat: boolean;
  hasWashingMachine: boolean;
  hasHotWater: boolean;
  hasAirCondition: boolean;

  rooms: RoomInfo[];
}

export class RoomInfo {
  id: number;
  roomNo: number;
  surface: number;
  hasInSuiteBathroom: boolean;
  hasBalcony: boolean;
  hasCloset: boolean;
  hasWifi: boolean;
  hasKitchenette: boolean;
  hasAirCondition: boolean;
  noOfSingleBeds: number;
  noOfDoubleBeds: number;
  noOfBunBeds: number;
}


export class DataModel {
  id: number;
  name: string;
}

export const bedTypes: DataModel[] = [
  {
    id: 10,
    name: 'Single',
  },
  {
    id: 20,
    name: 'Double',
  },
  {
    id: 30,
    name: 'Bank Bed',
  }
]

export const estateTypes: DataModel[]  = [
  {
    id: 10,
    name: 'Studio',
  },
  {
    id: 20,
    name: 'One Bedroom',
  },
  {
    id: 30,
    name: 'Two Bedrooms',
  },
  {
    id: 40,
    name: 'Three Bedrooms',
  },
  {
    id: 50,
    name: 'Four Bedrooms',
  },
  {
    id: 60,
    name: 'Villa',
  },
  {
    id: 70,
    name: 'Complex',
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

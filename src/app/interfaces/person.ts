export interface City {
  id?: number;
  name: string;
  countryId: number;
}

export interface Country {
  id: number;
  name: string;
  cities: City[];
}

export interface PersonUser {
  id: number;
  name: string;
  birthdate: string;
  addresses?: Address[];
  addressesCount?: number;
}

export interface Address {
  name: string;
  countryId: number;
  cityId: number;
  street: string;
}

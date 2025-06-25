export interface Country {
  name: string;
  area: number;
  population: number;
  density: number;
}

export interface CountriesState {
  username: string;
  limit: number;
  topCountries: Country[];
  loading: boolean;
  error: string | null;
}
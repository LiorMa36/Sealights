import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, switchMap, tap } from 'rxjs';
import { Address, City, Country, PersonUser } from './interfaces/person';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  countries$: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  citiesByCountries: Map<number, City[]> = new Map();

  constructor(private http: HttpClient) {}

  createPerson<PersonUser>(person: PersonUser): Observable<any> {
    return this.http.post('http://localhost:3000/api/person', person);
  }

  addCity(city: City): Observable<any> {
    return this.http.post('http://localhost:3000/api/city', city);
  }

  getCountriesAsObs(): Observable<Country[]> {
    return this.countries$.asObservable();
  }

  refreshCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('http://localhost:3000/api/countries').pipe(
      tap((countries: Country[]) => {
        this.parseCitiesByCountries(countries);
        this.countries$.next(countries);
      })
    );
  }

  getCitiesById(id: number): Observable<City> {
    return this.http.get<City>(`http://localhost:3000/api/cities/${id}`);
  }

  getPersons(): Observable<PersonUser[]> {
    return this.http.get<PersonUser[]>('http://localhost:3000/api/persons');
  }

  getCitiesByCountryId(id: number): City[] {
    return <City[]>this.citiesByCountries.get(id);
  }

  private parseCitiesByCountries(countries: Country[]) {
    this.citiesByCountries.clear();
    for (let country of countries) {
      this.citiesByCountries.set(country.id, country.cities);
    }
  }
}

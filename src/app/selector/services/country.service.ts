import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Country, CountrySmall } from '../interfaces/country.interface';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  private _apiUrl: string = environment.countryBaseUrl;

  get regions(): string[] {
    return [...this._regions];
  }

  get params (): HttpParams {
    return new HttpParams().set('fields', 'name,alpha2Code');
  }

  constructor(private http: HttpClient) { }

  public getCountriesByRegion(query: string): Observable<CountrySmall[]> {
    const url: string = `${this._apiUrl}/region/${query}`;

    return this.http.get<CountrySmall[]>(url, { params: this.params });
  }

  public getCountryById(id: string): Observable<Country> {
    const url: string = `${this._apiUrl}/alpha/${id}`;

    return this.http.get<Country>(url);
  }

  public getCountrySmallById(id: string): Observable<CountrySmall> {
    const url: string = `${this._apiUrl}/alpha/${id}`;

    return this.http.get<CountrySmall>(url, { params: this.params });
  }

  public getCountriesSmallByIds(borders: string[] | undefined): Observable<CountrySmall[]> {

    if (!borders) {
      return of([]);
    }

    const petitions: Observable<CountrySmall>[] = [];

    borders.forEach(code => {
      const petition = this.getCountrySmallById(code);
      petitions.push(petition);
    });

    return combineLatest(petitions);
  }
}

import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Country} from '../common/country';
import {State} from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/country/getAll';
  private stateUrl = 'http://localhost:8080/api/state';

  constructor(private httpClient: HttpClient) { }

  getCreditCardMonths(startMonth: number): Observable<number[]> {
    let months: number[] = [];

    for (let month = startMonth; month <= 12; month++) {
      months.push(month);
    }

    return of(months);
  }

  getCreditCardYears(): Observable<number[]> {

    let years: number[] = [];

    const  startYear: number = new Date().getFullYear();
    const  endYears: number = startYear + 10;

    for (let year = startYear; year <= endYears; year++) {
      years.push(year);
    }

    return  of(years);
  }

  getCountries(): Observable<Country[]> {
    return this.httpClient.get<Country[]>(this.countriesUrl);
  }

  getStates(countryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.stateUrl}/search/countryCode?code=${countryCode}`;

    return this.httpClient.get<State[]>(searchStatesUrl);
  }

}


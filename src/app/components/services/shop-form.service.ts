import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShopFormService {

  constructor() { }

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
}

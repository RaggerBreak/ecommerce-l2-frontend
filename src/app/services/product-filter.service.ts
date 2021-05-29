import { Injectable } from '@angular/core';
import {ProductFilter} from '../common/product-filter';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductFilterService {

  productFilter: Subject<ProductFilter> = new BehaviorSubject<ProductFilter>(new ProductFilter());

  constructor() { }

  setValue(value: ProductFilter): void {
    this.productFilter.next(value);
  }

}

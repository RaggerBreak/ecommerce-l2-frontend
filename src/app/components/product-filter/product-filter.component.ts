import { Component, OnInit } from '@angular/core';
import {ProductFilter} from '../../common/product-filter';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  productFilter: ProductFilter = new ProductFilter();

  constructor() { }

  ngOnInit(): void {

  }

}

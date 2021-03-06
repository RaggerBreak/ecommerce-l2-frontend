import { Component, OnInit } from '@angular/core';
import {ProductFilter} from '../../common/product-filter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProductFilterService} from '../../services/product-filter.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  productFilter: ProductFilter = new ProductFilter();

  filterFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private productFilterService: ProductFilterService) { }

  ngOnInit(): void {
    this.clearFilter();
    this.filterFormGroup = this.formBuilder.group({

      price: this.formBuilder.group({
        minPrice: new FormControl('',
          [Validators.min(0), Validators.pattern('^[0-9]*$')]),
        maxPrice: new FormControl('',
          [Validators.min(0), Validators.pattern('^[0-9]*$')])
      })
    });
  }

  get minPrice() {return this.filterFormGroup.get('price.minPrice'); }
  get maxPrice() {return this.filterFormGroup.get('price.maxPrice'); }


  onSubmit(): void {
    if (this.filterFormGroup.invalid) {
      this.filterFormGroup.markAllAsTouched();
      return;
    }

    this.productFilter.minPrice = this.minPrice.value;
    this.productFilter.maxPrice = this.maxPrice.value;

    if (this.maxPrice.value !== '' && this.productFilter.maxPrice < this.productFilter.minPrice) {
      this.productFilter.minPrice = this.maxPrice.value;
      this.productFilter.maxPrice = this.minPrice.value;

      this.minPrice.setValue(this.productFilter.minPrice);
      this.maxPrice.setValue(this.productFilter.maxPrice);
    }

    this.productFilterService.setValue(this.productFilter);

  }

  onReset(): void {
    this.productFilterService.clearFilter();
  }

  clearFilter(): void {
    this.productFilterService.productFilterClear.subscribe(data => {
      if (data === true) {
        this.minPrice.setValue(undefined);
        this.maxPrice.setValue(undefined);
      }
    });
  }

}

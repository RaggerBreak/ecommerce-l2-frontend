import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../services/product.service';
import {Product} from '../../common/product';
import {ActivatedRoute} from '@angular/router';
import {CartItem} from '../../common/cart-item';
import {CartService} from '../../services/cart.service';
import {ProductFilterService} from '../../services/product-filter.service';
import {ProductFilter} from '../../common/product-filter';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  previousKeyword: string = null;

  //pagination
  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;
  maxSize: number = 5;

  //product filter
  productFilter: ProductFilter = new ProductFilter();
  filterMode: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private productFilterService: ProductFilterService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.handleProductFilter();

    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts(): void {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }

  }

  handleSearchProducts(): void {
    this.filterMode = false;

    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword !== keyword) {
      this.pageNumber = 1;
    }
    this.previousKeyword = keyword;

    this.productService.searchProductsPaginate(this.pageNumber - 1, this.pageSize, keyword).subscribe(
      data => {
        this.products = data.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalElements = data.page.totalElements;
      });
  }

  handleListProducts(): void {
    // check if "id" parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      // Convert string to a number using the "+"
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }

    if (this.previousCategoryId !== this.currentCategoryId) {
      this.pageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    if (this.filterMode) {

      this.productService.getProductListPaginateFilter(this.pageNumber - 1, this.pageSize, this.currentCategoryId, this.productFilter)
        .subscribe(data => {
          this.products = data.products;
          this.pageNumber = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        });

    } else {

      this.productService.getProductListPaginate(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
        .subscribe(data => {
          this.products = data.products;
          this.pageNumber = data.page.number + 1;
          this.pageSize = data.page.size;
          this.totalElements = data.page.totalElements;
        });

    }


  }

  updatePageSize(pageSize: number): void {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product): void{
    const cartItem = new CartItem(product);

    this.cartService.addToCart(cartItem);
  }

  //Filter
  handleProductFilter(): void {
    this.productFilterService.productFilter.subscribe(data => {

      this.pageNumber = 1;

      this.productFilter = data;
      if (data.maxPrice || data.minPrice) {

        this.filterMode = true;
        this.listProducts();

      } else {

        this.filterMode = false;
        this.listProducts();

      }
    });
  }

}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';
import {ProductFilter} from '../common/product-filter';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productUrl = 'http://localhost:8080/api/product';
  private categoryUrl = 'http://localhost:8080/api/productCategory';

  constructor(private httpClient: HttpClient) { }

  getProduct(productId: number): Observable<Product> {
    const productUrl = `${this.productUrl}/${productId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(page: number,
                         pageSize: number,
                         categoryId: number): Observable<GetResponseProduct> {

    const searchUrl = `${this.productUrl}/search/category?id=${categoryId}`
                        + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductListPaginateFilter(page: number,
                              pageSize: number,
                              categoryId: number,
                              productFilter: ProductFilter): Observable<GetResponseProduct> {

    const searchUrl = `${this.productUrl}/search/categoryFilter?id=${categoryId}`
      + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  searchProductsPaginate(page: number,
                         pageSize: number,
                         keyword: string): Observable<GetResponseProduct> {

    const searchUrl = `${this.productUrl}/search/nameContaining?name=${keyword}`
                        + `&page=${page}&size=${pageSize}`;

    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(
      map(response => response.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient.get<ProductCategory[]>(`${this.categoryUrl}/getAll`);
  }
}

interface GetResponseProduct {
  products: Product[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

import {Product} from './product';

export class CartItem {
  id: number;
  name: string;
  imageId: number;
  unitPrice: number;
  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageId = product.imageId;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;
  }

}

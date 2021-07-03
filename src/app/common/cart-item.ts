import {Product} from './product';

export class CartItem {
  id: number;
  name: string;
  imageId: number;
  imageUrl: string;
  unitPrice: number;
  quantity: number;

  constructor(product: Product) {
    this.id = product.id;
    this.name = product.name;
    this.imageId = product.imageId;
    this.imageUrl = product._links.image.href;
    this.unitPrice = product.unitPrice;

    this.quantity = 1;
  }

}

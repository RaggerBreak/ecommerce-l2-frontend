import {CartItem} from './cart-item';

export class OrderItem {
  imageId: number;
  unitPrice: number;
  quantity: number;
  productId: number;

  constructor(cartItem: CartItem) {
    this.imageId = cartItem.imageId;
    this.quantity = cartItem.quantity;
    this.unitPrice = cartItem.unitPrice;
    this.productId = cartItem.id;
  }

}

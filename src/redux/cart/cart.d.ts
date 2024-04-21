import { ProductType } from '../products/product';

export type CartInitialState = {
  shoppingList: ProductType[];
  quantity: number;
  totalPrice: number;
};

import { ProductType } from '../products/product';

export type CartInitialState = {
  shoppingList: Cart[];
};

export type Cart = {
  product: ProductType;
  quantity: number;
};

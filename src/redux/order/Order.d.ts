import { ProductType } from '../products/product';
import { UserType } from '../users/user';

export type Order = {
  _id: string;
  user: UserType;
  items: Item[];
  createdAt: Date;
};

export type Item = {
  quantity: number;
  product: ProductType;
};

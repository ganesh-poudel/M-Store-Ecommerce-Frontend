// ProductSlice initial state

export interface InitialStateType {
  products: ProductType[];
  total: number;
  favouriteList: ProductType[];
  shopingCart: ProductType[];
  loading: boolean;
  searchString: string;
  error?: string;
}

export type Product = {
  total: number;
  products: ProductType[];
};

export interface ProductType {
  _id: string;
  size: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: {
    _id: string;
    title: string;
    image: string;
    _v: number;
  };
  createdAt: string;
  _v: number;
  quantity: number;
}

export interface CategoryType {
  _id: string;
  name: string;
  image: string;
}

export type ProductAddType = omit<ProductType, 'category', 'id'>;

export interface CreateProductType {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

// FILTERING
export enum SortCreated {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum SortPrice {
  ASC = 'ASC',
  DECS = 'DECS',
}

export enum SortTitle {
  ASC = 'ASC',
  DECS = 'DECS',
}

export enum Size {
  Small = 'S',
  Medium = 'M',
  Large = 'L',
}

export type Filter = {
  size: Size | '';
  category: string;
  min_price: number;
  max_price: number;
  sort_created: SortCreated;
  sort_title: SortTitle;
  sort_price: SortPrice;
  limit: number;
  offset: number;
};

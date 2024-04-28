// ProductSlice initial state

export type InitialStateType = {
  products: ProductType[];
  total: number;
  favouriteList: ProductType[];
  shopingCart: ProductType[];
  loading: boolean;
  searchString: string;
  error?: string;
};

export type Product = {
  total: number;
  products: ProductType[];
};

export type ProductType = {
  _id: string;
  sizes: string[];
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
};

export interface CategoryType {
  _id: string;
  name: string;
  image: string;
}

export interface CreateProductType {
  name: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  sizes: Size[];
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

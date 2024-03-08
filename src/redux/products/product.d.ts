// ProductSlice initial state

export interface InitialStateType {
  products: ProductType[];
  favouriteList: ProductType[];
  shopingCart: CartType[];
  loading: boolean;
  searchString: string;
  error?: string;
  categoryId: number;
}

export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

export interface CartType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
  quantity: number;
  totalPrice: number;
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

export type ProductAddType = omit<ProductType, "category", "id">;

export interface CreateProductType {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

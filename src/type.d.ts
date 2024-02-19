// Api response Product type
export interface ProductType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: CategoryType;
  images: string[];
}

export interface CategoryType {
  id: number;
  name: string;
  image: string;
}

// ProductSlice initial state

export interface InitialStateType {
  products: ProductType[];
  favouriteList: ProductType[];
  loading: boolean;
  searchString: string;
  error?: string;
}

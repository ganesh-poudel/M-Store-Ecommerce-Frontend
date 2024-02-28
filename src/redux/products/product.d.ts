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

export type ProductAddType = omit<ProductType, "category">;

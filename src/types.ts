export interface Product {
  title: string;
  desciption: string;
  sku: string;
  images: string[];
  videos: string[];
  price: number;
  quantity: number;
  is_active: boolean;
  category: Category[];
  promotion: null;
  specifications: {};
  _id: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  comments: [];
  avg_rate: null;
  is_commented: boolean;
  cartQuantity: number;
  quantity_order: number;
}

export interface Category {
  _id: string;
  name: string;
  is_active: boolean;
  sub_category: [];
  createdAt: string;
  updatedAt: string;
}

export interface Promotion {
  desciption: string;
  value: number;
  is_active: boolean;
  _id: string;
  title: string;
  start: string;
  end: string;
  createdAt: string;
  updatedAt: string;
}
export interface Comment {
  rate: number;
  _id: string;
  product: string;
  content: string;
  user_id: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdditionalState {
  status: string;
  error: string | null;
}

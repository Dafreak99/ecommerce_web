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
}

export interface Category {
  _id: string;
  name: string;
  is_active: boolean;
  sub_category: [];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

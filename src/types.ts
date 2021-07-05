import { StripeCardElementChangeEvent } from "@stripe/stripe-js";

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

export interface CheckoutedProduct {
  _id: string;
  images: string[];
  title: string;
  current_price: number;
  qty: number;
  amount: number;
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

export interface Order {
  buyer:
    | string
    | {
        name: string;
        phone: string;
        email: string;
        address: string;
        postcode: string;
      };
  charge_id: string;
  createdAt: string;
  description: string;
  products: Product[];
  status: string;
  total_amount: number;
  updatedAt: string;
  user: string | { first_name: string; last_name: string };
  _id: string;
}

export interface Buyer {
  _id: string;
  orders: any[];
  name: string;
  email: string;
  phone: string;
  address: string;
  postcode: string;
}

export interface Profile {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  address: string;
  phone: string;
}

export interface AdditionalState {
  status: string;
  error: string | null;
}

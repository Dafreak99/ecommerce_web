import Category from "./Category";
import Order from "./Order";
import OrderDetail from "./Order/OrderDetail";
import Overview from "./Overview";
import Payment from "./Payment";
import PaymentDetail from "./Payment/PaymentDetail";
import Product from "./Product";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";
import Promotion from "./Promotion";

const routes = [
  {
    path: "/overview",
    exact: false,
    component: Overview,
  },
  {
    path: "/product",
    exact: false,
    component: Product,
  },
  {
    path: "/add-product",
    exact: true,
    component: AddProduct,
  },
  {
    path: "/edit-product/:id",
    component: EditProduct,
  },
  {
    path: "/category",
    exact: true,
    component: Category,
  },
  {
    path: "/order",
    exact: true,
    component: Order,
  },
  {
    path: "/order/:id",
    component: OrderDetail,
  },
  {
    path: "/payment",
    exact: true,
    component: Payment,
  },
  {
    path: "/payment/:id",
    component: PaymentDetail,
  },
  {
    path: "/promotion",
    exact: true,
    component: Promotion,
  },
];

export default routes;

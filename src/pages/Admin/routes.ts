import Category from "./Category";
import Product from "./Product";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";
import SignIn from "./SignIn";
import Order from "./Order";
import OrderDetail from "./Order/OrderDetail";

const routes = [
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
    exact: true,
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
];

export default routes;

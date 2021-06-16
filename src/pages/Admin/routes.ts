import Category from "./Category";
import Product from "./Product";
import AddProduct from "./Product/AddProduct";
import EditProduct from "./Product/EditProduct";

const routes = [
  {
    path: "/",
    exact: true,
    component: Product,
  },
  {
    path: "/product-add",
    exact: true,
    component: AddProduct,
  },
  {
    path: "/product-edit",
    exact: true,
    component: EditProduct,
  },
  {
    path: "/category",
    exact: true,
    component: Category,
  },
];

export default routes;

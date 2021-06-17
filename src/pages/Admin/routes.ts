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
];

export default routes;

import {
  createCoupon,
  getCoupons,
  updateCoupon,
} from "../controllers/coupons-controller";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products-controller";
import { Router } from "express";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.post("/", createProduct);
productsRoutes.get("/:productId", getProduct);
productsRoutes.put("/:productId", updateProduct);
productsRoutes.delete("/:productId", deleteProduct);

productsRoutes.get("/:productId/coupons", getCoupons);
productsRoutes.post("/:productId/coupons", createCoupon);
productsRoutes.get("/:productId/coupons/:couponId", getCoupons);
productsRoutes.put("/:productId/coupons/:couponId", updateCoupon);

export default productsRoutes;

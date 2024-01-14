import {
  createCoupon,
  deleteCoupon,
  getCoupon,
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
import validate from "../middlewares/validate";
import { couponValidator, productValidator } from "../validators";

const productsRoutes = Router();

productsRoutes.get("/", getProducts);
productsRoutes.post(
  "/",
  validate(productValidator.createProduct),
  createProduct
);
productsRoutes.get("/:productId", getProduct);
productsRoutes.put(
  "/:productId",
  validate(productValidator.updateProduct),
  updateProduct
);
productsRoutes.delete("/:productId", deleteProduct);

productsRoutes.get("/:productId/coupons", getCoupons);
productsRoutes.post(
  "/:productId/coupons",
  validate(couponValidator.createCoupon),
  createCoupon
);
productsRoutes.get("/:productId/coupons/:couponId", getCoupon);
productsRoutes.put(
  "/:productId/coupons/:couponId",
  validate(couponValidator.updateCoupon),
  updateCoupon
);
productsRoutes.delete("/:productId/coupons/:couponId", deleteCoupon);

export default productsRoutes;

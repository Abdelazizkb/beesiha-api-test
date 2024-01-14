import Product, { ICoupon } from "../models/product";
import ErrorHandler from "../utils/error-handler";

const getCoupons = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  return product.coupons;
};

const getCoupon = async (productId: string, couponId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  const coupon = product.coupons.find((c) => c._id?.toString() === couponId);
  if (!coupon) {
    throw new ErrorHandler("Coupon not found", 400);
  }
  return coupon;
};

const createCoupon = async (couponBody: ICoupon, productId: string) => {
  const { code, discountType, discountValue } = couponBody;
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  product?.coupons.push({ code, discountType, discountValue });
  return product.save();
};

const updateCoupon = async (
  couponBody: ICoupon,
  productId: string,
  couponId: string
) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }

  const coupon = product.coupons.find(
    (coupon) => coupon._id?.toString() === couponId
  );

  if (!coupon) {
    throw new ErrorHandler("Coupon not found", 400);
  }

  await product.save();
  return product.updateOne(couponBody);
};

const deleteCoupon = async (productId: string, couponId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }

  const coupon = product.coupons.find(
    (coupon) => coupon._id?.toString() === couponId
  );

  if (!coupon) {
    throw new ErrorHandler("Coupon not found", 400);
  }

  const coupons = product.coupons.filter(
    (coupon) => coupon._id?.toString() !== couponId
  );

  product.coupons = coupons;
  return product.save();
};

export const couponServices = {
  getCoupons,
  getCoupon,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};

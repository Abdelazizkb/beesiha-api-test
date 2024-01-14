import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch-async-error";
import Product from "../models/product";
import ErrorHandler from "../utils/error-handler";

export const getCoupons = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      if (req.params.couponId) {
        const coupon = product.coupons.find(
          (c) => c._id?.toString() === req.params.couponId
        );
        if (!coupon) {
          return res.status(404).json({ error: "Coupon not found" });
        }
        return res.status(204).json({ success: true, data: coupon });
      } else {
        res.status(204).json({ success: true, data: product.coupons });
      }
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, discountType, discountValue } = req.body;
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      product?.coupons.push({ code, discountType, discountValue });
      await product.save();

      res.status(204).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { discountType, discountValue } = req.body;
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const coupon = product.coupons.find(
        (coupon) => coupon._id?.toString() === req.params.couponId
      );

      if (!coupon) {
        return res.status(404).json({ error: "Coupon not found" });
      }

      coupon.discountType = discountType ? discountType : coupon.discountType;
      coupon.discountValue = discountValue
        ? discountValue
        : coupon.discountValue;

      await product.save();

      res.status(204).json({ success: true, data: coupon });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }

      const coupons = product.coupons.filter(
        (coupon) => coupon._id?.toString() !== req.params.couponId
      );

      product.coupons = coupons;
      await product.save();

      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

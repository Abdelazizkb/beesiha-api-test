import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch-async-error";
import Product from "../models/product";
import ErrorHandler from "../utils/error-handler";

export const getProducts = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await Product.find();

      res.status(200).json({ success: true, data: products });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findById(req.params.productId);

      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }
      res.status(200).json({ success: true, data: product });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = new Product({ ...req.body });

      await product.save();
      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findOne({ _id: req.params.productId });
      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }
      await product.updateOne({ ...req.body });

      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteProduct = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const product = await Product.findOne({ _id: req.params.productId });

      if (!product) {
        return next(new ErrorHandler("Product not found", 400));
      }

      await product.deleteOne();

      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch-async-error";
import Product from "../models/product";
import ErrorHandler from "../utils/error-handler";
import ProductsCollection from "../models/collection";

export const getCollections = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collections = await ProductsCollection.find();

      res.status(200).json({ success: true, data: collections });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collection = await ProductsCollection.findById(
        req.params.collectionId
      );

      if (!collection) {
        return next(new ErrorHandler("Collection not found", 400));
      }
      res.status(200).json({ success: true, data: collection });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, price, products } = req.body;

      const invalidProductIds = await Product.checkInvalidProductIds(products);

      if (invalidProductIds.length > 0) {
        return next(new ErrorHandler("Enter a valid products", 400));
      }

      if (price <= 0) {
        return next(new ErrorHandler("Enter a valid price", 400));
      }

      const collection = new ProductsCollection({ name, price, products });

      await collection.save();
      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { price, products } = req.body;

      const collection = await ProductsCollection.findOne({
        _id: req.params.collectionId,
      });

      if (!collection) {
        return next(new ErrorHandler("Collection not found", 400));
      }

      const invalidProductIds = await Product.checkInvalidProductIds(products);

      if (invalidProductIds.length > 0) {
        return next(new ErrorHandler("Enter a valid products", 400));
      }

      if (price <= 0) {
        return next(new ErrorHandler("Enter a valid price", 400));
      }

      await collection.updateOne({ ...req.body });

      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const collection = await ProductsCollection.findOne({
        _id: req.params.collectionId,
      });

      if (!collection) {
        return next(new ErrorHandler("Collection not found", 400));
      }

      await collection.deleteOne();

      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

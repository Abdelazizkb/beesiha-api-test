import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch-async-error";
import Product from "../models/product";
import ErrorHandler from "../utils/error-handler";
import ProductsCollection from "../models/collection";
import { collectionServices } from "../services";

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
      const collection = await collectionServices.getCollection(
        req.params.collectionId
      );

      res.status(200).json({ success: true, data: collection });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await collectionServices.createCollection(req.body);
      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const addProductToCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await collectionServices.addProductToCollection(
        req.body,
        req.params.collectionId
      );
      res.status(201).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteProductFromCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await collectionServices.deleteProductFromCollection(
        req.params.collectionId,
        req.params.productId
      );
      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await collectionServices.updateCollection(
        req.body,
        req.params.collectionId
      );
      res.status(201).json({ success: true, message: "Updated successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteCollection = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await await collectionServices.deleteCollection(req.params.collectionId);

      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

import { NextFunction, Request, Response } from "express";
import catchAsyncError from "../middlewares/catch-async-error";
import ErrorHandler from "../utils/error-handler";
import { couponServices } from "../services";

export const getCoupons = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await couponServices.getCoupons(req.params.productId);
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await couponServices.getCoupon(
        req.params.productId,
        req.params.couponId
      );
      res.status(200).json({ success: true, data });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const createCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await couponServices.createCoupon(req.body, req.params.productId);

      res.status(200).json({ success: true, message: "Created successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const updateCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await couponServices.updateCoupon(
        req.body,
        req.params.productId,
        req.params.couponId
      );
      res.status(200).json({ success: true, message: "Updated successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

export const deleteCoupon = catchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await couponServices.deleteCoupon(
        req.params.productId,
        req.params.couponId
      );

      res.status(201).json({ success: true, message: "Deleted successfully" });
    } catch (error: any) {
      next(new ErrorHandler(error.message, 400));
    }
  }
);

import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/error-handler";

const validate =
  (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      return next();
    } catch (error: any) {
      if (error) {
        const errorMessage = error.details
          .map((details: any) => details.message)
          .join(", ");
        return next(new ErrorHandler(errorMessage, 400));
      }
    }
    next();
  };

export default validate;

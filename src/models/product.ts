import mongoose, { Document, Model, Schema } from "mongoose";
require("dotenv").config();

export interface ICoupon {
  _id?: string;
  code: string;
  discountType: string;
  discountValue: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  coupons: Array<ICoupon>;
}

interface ProductModel extends Model<IProduct> {
  checkInvalidProductIds(ids: string[]): Promise<string[]>;
}

const productSchema: Schema<IProduct, ProductModel> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      min: 1,
      required: true,
    },
    description: String,
    coupons: [
      {
        code: {
          type: String,
          required: true,
        },
        discountType: {
          type: String,
          required: true,
          enum: ["percentage", "fixed"],
        },
        discountValue: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

productSchema.static(
  "checkInvalidProductIds",
  async function (ids: string[]): Promise<string[]> {
    const invalidProductIds: string[] = [];

    for (const id of ids) {
      try {
        await this.findById(id);
      } catch (error) {
        invalidProductIds.push(id);
      }
    }

    return invalidProductIds;
  }
);

const Product = mongoose.model<IProduct, ProductModel>(
  "Product",
  productSchema
);

export default Product;

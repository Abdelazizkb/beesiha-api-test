import mongoose, { Document, Model, Schema } from "mongoose";
require("dotenv").config();

interface ICoupons {
  _id?: string;
  code: string;
  discountType: string;
  discountValue: string;
}

export interface IProduct extends Document {
  name: string;
  price: number;
  description?: string;
  coupons: Array<ICoupons>;
}

interface ProductModel extends Model<IProduct> {
  checkInvalidProductIds(ids: string[]): Promise<string[]>;
}

const productSchema: Schema<IProduct, ProductModel> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter name of product"],
    },
    price: {
      type: Number,
      min: 1,
      required: [true, "Please enter a valid price"],
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

    console.log({ ids });
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

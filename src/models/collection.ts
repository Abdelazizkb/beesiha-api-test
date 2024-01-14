import mongoose, { Document, Model, Schema } from "mongoose";
require("dotenv").config();

export interface ICollection extends Document {
  name: string;
  price: number;
  products: Array<string>;
}

const productsCollectionSchema: Schema<ICollection> = new mongoose.Schema(
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
    products: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ProductsCollection: Model<ICollection> = mongoose.model(
  "ProductsCollection",
  productsCollectionSchema
);

export default ProductsCollection;

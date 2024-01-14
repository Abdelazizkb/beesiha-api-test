import Product, { IProduct } from "../models/product";
import ErrorHandler from "../utils/error-handler";

const getProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  return product;
};

const createProduct = async (productBody: IProduct) => {
  return Product.create(productBody);
};

const updateProduct = async (productBody: IProduct, productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  return product.updateOne(productBody);
};

const deleteProduct = async (productId: string) => {
  const product = await Product.findById(productId);
  if (!product) {
    throw new ErrorHandler("Product not found", 400);
  }
  return product.deleteOne();
};

export const productServices = {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};

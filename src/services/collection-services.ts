import ProductsCollection, { ICollection } from "../models/collection";
import Product from "../models/product";
import ErrorHandler from "../utils/error-handler";

const getCollection = async (collectionId: string) => {
  const collection = await ProductsCollection.findById(collectionId);
  if (!collection) {
    throw new ErrorHandler("Collection not found", 400);
  }
  const products = await Product.where("_id").in(collection.products);
  return { name: collection.name, products };
};

const createCollection = async (collectionBody: ICollection) => {
  const invalidProductIds = await Product.checkInvalidProductIds(
    collectionBody.products
  );

  if (invalidProductIds.length > 0) {
    throw new ErrorHandler("Enter a valid products ids", 400);
  }

  return ProductsCollection.create(collectionBody);
};

const addProductToCollection = async (
  addProductBody: { productId: string },
  collectionId: string
) => {
  const collection = await ProductsCollection.findById(collectionId);

  if (!collection) {
    throw new ErrorHandler("Collection not found", 400);
  }

  if (collection.products.includes(addProductBody.productId)) {
    throw new ErrorHandler("Product already exist", 400);
  }

  if (!(await Product.findById(addProductBody.productId))) {
    throw new ErrorHandler("Product not found", 400);
  }

  collection.products.push(addProductBody.productId);
  return collection.save();
};

const deleteProductFromCollection = async (
  collectionId: string,
  productId: string
) => {
  const collection = await ProductsCollection.findById(collectionId);

  if (!collection) {
    throw new ErrorHandler("Collection not found", 400);
  }

  if (!collection.products.includes(productId)) {
    throw new ErrorHandler("Product not found", 400);
  }

  collection.products = collection.products.filter((PId) => PId !== productId);
  return collection.save();
};

const updateCollection = async (
  collectionBody: ICollection,
  collectionId: string
) => {
  const collection = await ProductsCollection.findById(collectionId);

  if (!collection) {
    throw new ErrorHandler("Collection not found", 400);
  }

  if (!!collectionBody.products) {
    const invalidProductIds = await Product.checkInvalidProductIds(
      collectionBody.products
    );

    if (invalidProductIds.length > 0) {
      throw new ErrorHandler("Enter a valid products ids", 400);
    }
  }

  return collection.updateOne(collectionBody);
};

const deleteCollection = async (collectionId: string) => {
  const collection = await ProductsCollection.findById(collectionId);
  if (!collection) {
    throw new ErrorHandler("Collection not found", 400);
  }
  return collection.deleteOne();
};

export const collectionServices = {
  getCollection,
  createCollection,
  updateCollection,
  deleteCollection,
  addProductToCollection,
  deleteProductFromCollection,
};

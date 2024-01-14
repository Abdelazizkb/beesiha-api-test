const Joi = require("joi");

const createCollection = Joi.object({
  name: Joi.string().required("Name is required"),
  products: Joi.array().min(1).required("Products is required"),
  price: Joi.number().min(1).required("Price is required"),
});

const updateCollection = Joi.object({
  name: Joi.string(),
  products: Joi.array().min(1),
  price: Joi.number().min(1),
});

const addProductToCollection = Joi.object({
  productId: Joi.string().required("productId is required"),
});

export const collectionValidator = {
  createCollection,
  updateCollection,
  addProductToCollection,
};

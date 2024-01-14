const Joi = require("joi");

const createProduct = Joi.object({
  name: Joi.string().required("Name is required"),
  price: Joi.number().min(1).required("Price is required"),
  description: Joi.string(),
});

const updateProduct = Joi.object({
  name: Joi.string(),
  price: Joi.number().min(1),
  description: Joi.string(),
});

export const productValidator = { createProduct, updateProduct };

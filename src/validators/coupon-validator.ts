const Joi = require("joi");

const createCoupon = Joi.object({
  code: Joi.string().required("Code is required"),
  discountType: Joi.string()
    .valid("percentage", "fixed")
    .required("discountType is required"),
  discountValue: Joi.string().required("discountValue is required"),
});

const updateCoupon = Joi.object({
  code: Joi.string(),
  discountType: Joi.string().valid("percentage", "fixed"),
  discountValue: Joi.string(),
});

export const couponValidator = { createCoupon, updateCoupon };

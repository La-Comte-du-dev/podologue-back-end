import Joi from 'joi';

export const patientSchema = Joi.object({
  firstname: Joi.string().min(3).max(100).required(),
  lastname: Joi.string().min(3).max(100).required(),
  adress1: Joi.string().min(3).max(50).required(),
  adress2: Joi.string().min(3).max(50),
  zipcode: Joi.string()
    .regex(/^[0-9]{5}$/)
    .required(),
  city: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().max(255),
  phone: Joi.string().regex(/^[0-9]{10}$/),
});

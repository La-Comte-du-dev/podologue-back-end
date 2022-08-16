import * as Joi from 'joi';

export const logSchema = Joi.object({
  source: Joi.string().min(4).max(5).required(),
  category: Joi.string().min(4).max(7).required(),
  component: Joi.string().min(3).required(),
  message: Joi.string().max(255).required(),
  error: Joi.string().min(3).max(255).required(),
});

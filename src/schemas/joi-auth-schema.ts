import Joi from 'joi';
import { joiPassword as JoiPassword } from 'joi-password';

export const signupSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  email: Joi.string().email().max(255).required(),
  password: JoiPassword.string()
    .min(8)
    .max(20)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

export const signinSchema = Joi.object({
  username: Joi.string().min(3).max(20).required(),
  password: JoiPassword.string()
    .min(8)
    .max(20)
    .minOfSpecialCharacters(1)
    .minOfLowercase(1)
    .minOfUppercase(1)
    .minOfNumeric(1)
    .noWhiteSpaces()
    .required(),
});

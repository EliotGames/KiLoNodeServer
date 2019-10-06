const Joi = require('joi');

module.exports = Joi.object().keys({
  firstName: Joi.string()
    .trim()
    .max(30)
    .required(),
  telegramId: Joi.string()
    .regex(/^[0-9]+$/, 'numbers')
    .min(3)
    .max(15)
    .trim()
});
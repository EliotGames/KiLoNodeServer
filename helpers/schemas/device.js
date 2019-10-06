const Joi = require('joi');

module.exports = Joi.object().keys({
  _id: Joi.string()
    .length(20)
    .required(),
  currentWeight: Joi.number()
    .positive()
    .required(),
  name: Joi.string()
    .min(3)
    .max(35)
    .trim(),
  maxWeight: Joi.number().positive(),
  alertEmptiness: Joi.number()
    .positive()
    .min(0)
    .max(100)
    .invalid(100),
  productName: Joi.string()
    .trim()
    .min(3)
    .max(35),
  userIds: Joi.array().items(
    Joi.object().keys({
      telegramId: Joi.string()
        .regex(/^[0-9]+$/, 'numbers')
        .trim()
        .length(20)
    })
  )
});
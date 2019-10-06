const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../models/user');

// Validation shema
const USER_SCHEMA = Joi.object().keys({
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

async function createItem(req, res, next) {
  const validationResult = Joi.validate(req.body, USER_SCHEMA);

  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details[0]);
  }

  const resUser = validationResult.value;

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: resUser.firstName,
    telegramId: resUser.telegramId || null
  });

  try {
    const result = await newUser.save();

    return res.json({
      message: 'POST request to users',
      createdUser: result
    });
  } catch (e) {
    next(e);
  }
}

async function getAll(req, res, next) {
  try {
    const docs = await User.find().exec();

    return res.json(docs);
  } catch (e) {
    next(e);
  }
}

async function getById(req, res, next) {
  try {
    const doc = await User.findOne({ telegramId: telegramId });
    if (!doc) {
      return next({
        status: HttpStatus.NOT_FOUND,
        message: 'User is not found'
      });
    }

    return res.json(doc);
  } catch (e) {
    next(e);
  }
}

module.exports = {
  createItem,
  getAll,
  getById
};

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../db/models/user');

// Validation shema
const USER_SCHEMA = Joi.object().keys({
  firstName: Joi.string().trim().max(30).required(),
  telegramId: Joi.string().regex(/^[0-9]+$/, 'numbers').min(3).max(15).trim(),
});

// Routes
router.post('/', (req, res, next) => {
  let validationResult = Joi.validate(req.body, USER_SCHEMA);

  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details[0]);
  }

  const resUser = validationResult.value;

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName: resUser.firstName,
    telegramId: resUser.telegramId || null,
  });

  user.save().then(result => {
    res.status(HttpStatus.OK).json({
      message: 'POST request to users',
      createdUser: result
    });
  })
  .catch(err => next(err));
});

router.get('/', (req, res, next) => {
  // if user has telegram
  if (req.query.telegramId) {
    const telegramId = req.query.telegramId;
    User.findOne({ telegramId: telegramId }, (err, doc) => {
      if (err) return next(err);

      if (doc) {
        res.status(HttpStatus.OK).json(doc);
      } else {
        next({
          status: HttpStatus.NOT_FOUND,
          message: "User is not found"
        });
      }
    })
  // returns all users
  } else { 
    User.find()
      .exec()
      .then(docs => {
        res.status(HttpStatus.OK).json(docs);
      })
      .catch(err => next(err));
  }
});

module.exports = router;
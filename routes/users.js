const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Joi = require('joi');
const HttpStatus = require('http-status-codes');
const User = require('../db/models/user');

const USER_SCHEMA = Joi.object().keys({
  id: Joi.string().regex(/^[0-9]+$/, 'numbers').min(3).max(15).trim().required(),
  firstName: Joi.string().trim().max(20).required(),
});

// Routes
router.post('/', (req, res, next) => {
  let validationResult = Joi.validate(req.body, USER_SCHEMA);

  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details[0]);
  }

  const resUser = validationResult.value;

  const user = new User({
    _id: resUser.id,
    firstName: resUser.firstName,
  });

  user.save().then(result => {
    res.status(HttpStatus.OK).json({
      message: 'POST request to users',
      createdUser: result
    });
  });
});

router.get('/', (req, res, next) => {
  User.find()
    .exec()
    .then(docs => {
      res.status(HttpStatus.OK).json(docs);
    })
    .catch(err => next(err));
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(HttpStatus.OK).json(doc);
      } else {
        next({
          status: HttpStatus.NOT_FOUND,
          message: "User is not found"
        })
      }
    })
    .catch(err => {
      next(err);
    })
});

module.exports = router;
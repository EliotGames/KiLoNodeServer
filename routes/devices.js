const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Joi = require("joi");
const HttpStatus = require("http-status-codes");
const Device = require("../db/models/device");

const DEVICE_SCHEMA = Joi.object().keys({
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
        .regex(/^[0-9]+$/, "numbers")
        .trim()
        .length(20)
    })
  )
});

// Routes
router.post("/", (req, res, next) => {
  let validationResult = Joi.validate(req.body, DEVICE_SCHEMA);
  if (validationResult.error) {
    return res
      .status(HttpStatus.BAD_REQUEST)
      .json(validationResult.error.details[0]);
  }

  const resDevice = validationResult.value;

  const device = new Device({
    _id: resDevice._id,
    currentWeight: resDevice.currentWeight || "",
    name: resDevice.name || `Dev${resDevice._id}`,
    maxWeight: resDevice.maxWeight || resDevice.currentWeight,
    alertEmptiness: resDevice.alertEmptiness || 20,
    productName: resDevice.productName || "",
    userIds: resDevice.userIds || []
  });

  device
    .save()
    .then(result => {
      res.status(HttpStatus.OK).json({
        message: "POST request to devices",
        createdDevice: result
      });
    })
    .catch(err => next(err));
});

router.get("/", (req, res, next) => {
  Device.find()
    .exec()
    .then(docs => {
      res.status(HttpStatus.OK).json(docs);
    })
    .catch(err => next(err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Device.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(HttpStatus.OK).json(doc);
      } else {
        next({
          status: HttpStatus.NOT_FOUND,
          message: "Product is not found"
        });
      }
    })
    .catch(err => next(err));
});

router.patch("/:deviceId", (req, res, next) => {
  const newDevice = req.body;
  const oldDevice = { _id: req.params.deviceId };

  Device.findById(req.params.deviceId)
    .exec()
    .then(doc => {
      if (doc) {
        Device.findOneAndUpdate(
          oldDevice,
          newDevice,
          { upsert: false },
          (err, doc) => {
            if (err) return next(err);

            return res.status(HttpStatus.OK).json({
              message: "Succesfully saved",
              updatedDevice: doc
            });
          }
        );
      } else {
        next({
          status: HttpStatus.NOT_FOUND,
          message: "Product is not found"
        });
      }
    })
    .catch(err => next(err));
});

router.delete("/:deviceId", (req, res, next) => {
  const id = req.params.deviceId;
  Device.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(HttpStatus.OK).json({ itemsDeleted: result.deletedCount });
    })
    .catch(err => next(err));
});

module.exports = router;

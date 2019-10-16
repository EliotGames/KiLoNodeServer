const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const HttpStatus = require('http-status-codes');
const Product = require('../db/models/product');

// Routes
router.post('/', (req, res, next) => {
  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details[0]);
  }

  const resProduct = validationResult.value;

  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: resProduct.name,
    price: resProduct.price,
    isAvaiable: resProduct.isAvaiable,
  });

  product.save().then(result => {
    res.json({
      message: 'POST request to products',
      createdProduct: result
    });
  }).catch(err => next(err));
});

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.json(docs);
    })
    .catch(err => next(err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.json(doc);
      } else {
        next({
          status: HttpStatus.NOT_FOUND,
          message: "Product is not found"
        })
      }
    })
    .catch(err => next(err));
});

router.patch('/:productId', (req, res, next) => {
  let validationResult = Joi.validate(req.body, PRODUCT_SCHEMA);

  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details);
  }

  const newProduct = validationResult.value;
  const oldProduct = { '_id': req.params.productId };

  Product.findOneAndUpdate(oldProduct, newProduct, { upsert: false }, (err, doc) => {
    if (err) return next(err);

    return res.json({
      message: "Succesfully saved",
      updatedProduct: newProduct
    });
  });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.json({ itemsDeleted: result.deletedCount });
    })
    .catch(err => next(err));
});

module.exports = router;
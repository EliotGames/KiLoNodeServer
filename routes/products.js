const express = require('express');
const mongoose = require('mongoose');
const Product = require('../db/models/product');

const router = express.Router();

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    isAvaiable: req.body.isAvaiable,
  });

  product.save().then(result => {
    res.status(200).json({
      message: 'Handling POST request to products',
      createdProduct: result
    });
  });
});

router.get('/', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => next(err));
});

router.get("/:productId", (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        next({
          status: 404,
          message: "Product is not found"
        })
      }
    })
    .catch(err => {
      next(err);
    })
});

router.patch('/:productId', (req, res, next) => {
  const oldProduct = {'_id': req.params.productId };
  const newProduct = req.body;
  
  Product.findOneAndUpdate(oldProduct, newProduct, {upsert: false}, (err, doc) => {
      if (err) return next(err);

      return res.send("Succesfully saved");
  });
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({itemsDeleted: result.deletedCount});
    })
    .catch(err => next(err));
});

module.exports = router;
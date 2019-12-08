const HttpStatus = require("http-status-codes");
const Product = require("../models/product");

/*
  Creates new product
  Method: POST
  Url: api/product
  Body example: 
  {
    "name": "Apple",
    "price": 23,
    "type": "solid",
    "isAvaiable": true,
  }
*/
async function createProduct(req, res, next) {
  const { name, price, type, isAvaiable } = req.body;

  const newProduct = new Product({
    name,
    price,
    type,
    isAvaiable
  });

  try {
    const createdProduct = await newProduct.save();

    return res.json({
      createdProduct
    });
  } catch (e) {
    next(e);
  }
}

/*
  Gets all products
  Method: GET
  Url: api/product
*/
async function getAllProducts(req, res, next) {
  try {
    const products = await Product.find().exec();

    return res.json(products);
  } catch (e) {
    next(e);
  }
}

/*
  Gets product by id
  Method: GET
  Url: api/product
*/
async function getProductById(req, res, next) {
  const id = req.params.id;

  try {
    const product = await Product.findById(id);

    if (!product) {
      return next({
        status: HttpStatus.NOT_FOUND,
        message: "Product is not found"
      });
    }

    return res.json(doc);
  } catch (e) {
    next(e);
  }
}

// TODO: rewrite
async function updateProduct(req, res, next) {
  let validationResult = Joi.validate(req.body, PRODUCT_SCHEMA);

  if (validationResult.error) {
    return res.status(HttpStatus.BAD_REQUEST).json(validationResult.error.details);
  }

  const newProduct = validationResult.value;
  const oldProduct = { _id: req.params.productId };

  Product.findOneAndUpdate(oldProduct, newProduct, { upsert: false }, (err, doc) => {
    if (err) return next(err);

    return res.json({
      message: "Succesfully saved",
      updatedProduct: newProduct
    });
  });
}

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct
};

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./api/models/product');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Main Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/pages/index.html');
});

app.post('/products', (req, res, next) => {
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

app.get('/products', (req, res, next) => {
  Product.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => next(err));
});

app.get("/products/:productId", (req, res, next) => {
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

app.patch('/products/:productId', (req, res, next) => {
  const oldProduct = {'_id': req.params.productId };
  const newProduct = req.body;
  
  Product.findOneAndUpdate(oldProduct, newProduct, {upsert: false}, (err, doc) => {
      if (err) return next(err);

      return res.send("Succesfully saved");
  });
});

app.delete('/products/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({itemsDeleted: result.deletedCount});
    })
    .catch(err => next(err));
});


// Test route for development
app.get('/test', (req, res, next) => {
  if (process.env.NODE_ENV === 'production') return next();

  res.send("Test GET request on server");
});

// All undefined routes
app.use((req, res) => {
  res.status(404).send("Sorry, Page not found :( ");
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (process.env.NODE_ENV !== 'production') {
    res.json({ message: err.message });
  } else {
    res.send('500 Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Node server started on port: ${PORT}`);
});

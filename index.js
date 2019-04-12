const express = require('express');
const mongoose = require('mongoose');
const Product = require('./api/models/product');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json())
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

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
    console.log(`Product saved: ${result}`);
  });

  res.status(201).json({
    message: 'Handling POST request to products',
    createdProduct: product
  });
});

app.get('/test', (req, res) => {
  res.send("Test GET request on server");
});


app.listen(PORT, () => {
  console.log('Node server started');
});

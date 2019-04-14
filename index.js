const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const products = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Main Routes
app.use('/products', products);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index.html');
});


// Test route for development
app.get('/test', (req, res, next) => {
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

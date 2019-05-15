const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const productsRoute = require('./routes/products');
const usersRoute = require('./routes/users');
const devicesRoute = require('./routes/devices');
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Main Routes
app.use('/products', productsRoute);
app.use('/users', usersRoute);
app.use('/devices', devicesRoute);


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/pages/index.html');
});

// Test route for development
app.get('/test', (req, res, next) => {
  res.send("Tesing...");
});

// All undefined routes
app.use((req, res) => {
  res.status(404).send("Sorry, Page not found :( ");
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (process.env.NODE_ENV !== 'production') {
    res.json({ message: err.toString() });
  } else {
    res.send('500 Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Node server started on port: ${PORT}`);
});

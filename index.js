const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

if (process.env.NODE_ENV === "production") {
  require("dotenv-safe").config();
}

const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());

// MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });

// Main Routes
app.use("/api", routes);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/pages/index.html");
});

// All undefined routes
app.use((req, res) => {
  res.status(404).send("Sorry, Page not found :( ");
});

// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);

  if (process.env.NODE_ENV !== "production") {
    res.json({ message: err.toString() });
  } else {
    res.send("500 Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Node server started on port: ${PORT}`);
});

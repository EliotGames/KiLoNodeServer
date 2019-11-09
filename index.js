const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

if (process.env.NODE_ENV !== "production") {
  require("dotenv-safe").config();
}

const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

const allowedUrls = ["https://kilo-admin-panel.herokuapp.com", "http://localhost:3000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedUrls.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
};
app.use(cors(corsOptions));
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
    console.log(err);
    res.json({ message: err.toString() });
  } else {
    res.send("500 Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Node server started on port: ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/dev");
const SampleDB = require("./sample-db");

const productRoutes = require("./routes/products");
const userRoutes = require("./routes/users");
const bodyParser = require("body-parser");

mongoose
  .connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //userCreateIndex: true,
  })
  .then(() => {
    const sampleDB = new SampleDB();
    //sampleDB.initDB();
  });

const app = express();
app.use(bodyParser.json());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || "3001";

app.get("/products", function (req, res) {
  res.json({ success: true });
});

app.listen(PORT, function () {
  console.log("I am running!");
});

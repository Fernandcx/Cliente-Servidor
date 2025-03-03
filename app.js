require("dotenv").config();
const express = require("express");
const usersRoutes = require("./routes/usersRoutes");
const productosRoutes = require("./routes/productosRoutes");
const cors = require("cors"); // CSRF

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", usersRoutes);
app.use("/api/products", productosRoutes);

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

module.exports = app;

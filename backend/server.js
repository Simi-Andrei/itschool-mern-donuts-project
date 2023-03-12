const express = require("express");
require("dotenv").config();
require("colors");
const connectDB = require("./db/connectDB");
const { errorHandler } = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

connectDB();

const app = express();

app.use(express.json());

app.get("/user", function (req, res) {
  console.log("Name: ", req.query.name);
  console.log("Age:", req.query.age);
  res.send();
});

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(errorHandler);

const port = process.env.PORT || 5001;
app.listen(port, () =>
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
  )
);

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./app/routes/user");
const authRoute = require("./app/routes/auth");
const productRoute = require("./app/routes/product");
const cartRoute = require("./app/routes/cart");
const orderRoute = require("./app/routes/order");
const cors = require("cors");

dotenv.config();


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running at port ${process.env.PORT}`);
});
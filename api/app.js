require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.NODE_PORT;
const app = express();
const userRouter = require("./users/userRouter");
const partsList = require("./lists/partListRouter");
const vendorRouter = require("./lists/vendorRouter");
const matRouter = require("./material/material_router");
app.use(cors());
app.use(express.json());
app.use("/users", userRouter);
app.use("/parts", partsList);
app.use("/vendors", vendorRouter);
app.use("/mat", matRouter);
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const server = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 9000;
const authRouter = require("./routes/authRouter");
const partRouter = require("./routes/partRouter");
const vendorRouter = require("./routes/vendorRouter");
const userRouter = require("./routes/userRouter");
const dbConnect = require("./config/dbConnect");

dbConnect();

server.use(express.urlencoded({ extended: false }));
server.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173"
  })
);

server.use(express.json());
server.use(cookieParser(JSON.stringify(process.env.REFRESH_SECRET)));

server.use("/parts", partRouter);
server.use("/user", userRouter);
server.use("/auth", authRouter);
server.use("/vend", vendorRouter);
server.use((err, req, res, next) => {
  res.status(500).json({ message: "end of the line error" });
});
mongoose.connection.once("open", () => {
  console.log("connected to DB");
  server.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
});

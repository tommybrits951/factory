require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const server = express()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 9000
const authRouter = require("./routes/authRouter")
const userRouter = require("./routes/userRouter")
const dbConnect = require("./config/dbConnect")

dbConnect()

server.use(express.urlencoded({extended: false}))
server.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}))
server.use(express.json())
server.use(cookieParser(JSON.stringify(process.env.REFRESH_SECRET)))





server.use("/user", userRouter)
server.use('/auth', authRouter)



mongoose.connection.once("open", () => {
    console.log("connected to DB")
    server.listen(PORT, () => {
        console.log(`server running on ${PORT}`)
    })
})

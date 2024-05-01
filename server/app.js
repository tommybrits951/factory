require('dotenv').config()
const express = require('express')
const cors = require('cors')
const server = express()
const cookieParser = require('cookie-parser')
const PORT = process.env.PORT || 9000
const { logger } = require('./middleware/logger')
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')
const partRouter = require('./routes/partRouter')
const vendorRouter = require('./routes/vendorRouter')
const jobRouter = require('./routes/jobRouter')
server.use(express.urlencoded({ extended: false }))
server.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173'
  })
)

server.use(express.json())
server.use(logger)
server.use(cookieParser(JSON.stringify(process.env.REFRESH_SECRET)))
server.use('/users', userRouter)
server.use('/auth', authRouter)
server.use('/parts', partRouter)
server.use('/vendor', vendorRouter)
server.use('/job', jobRouter)

server.use((err, req, res, next) => {
  res.status(500).json({ message: 'end of the line error' })
})

server.listen(PORT, () => {
  console.log(`server running on ${PORT}`)
})

const cors = require('cors')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db/connection')
const cookieParser = require('cookie-parser')

const app = express()
const userRouter = require('./router/userRouter')
const adminRouter = require('./router/adminRouter')

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
}

app.use(cors(corsOptions))
app.options('http://localhost:3000', cors({ origin: true, credentials: true }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', userRouter)
app.use('/admin', adminRouter)

db.on('error', console.error.bind(console, 'Mongodb connection failed'))

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'Something went wrong'
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

app.listen(2000, () => {
  console.log('server running on 2000')
})
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')

const authorRoute = require('./route/author')

const bookRoute = require("./route/book")

dotenv.config()

//connectDB
mongoose.connect((process.env.MONGODB_URL), () => {
    console.log('Connect to MongoDB successfully')
})


app.use(bodyParser.json({ limit: '50mb' }))

app.use(cors())

app.use(morgan('common'))

//routes
app.use('/bookapi/v1/author', authorRoute)
app.use("/bookapi/v1/book", bookRoute);

app.listen(8000, () => {
    console.log('Server is running...')
})
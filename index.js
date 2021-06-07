
const express = require('express')

const cors = require('cors')
const app = express()

// @desc for body parsing
app.use(express.json())

// @desc to prevent Cross-Origin Resource Sharing error
app.use(cors())

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT | 3333

const { initializeConnection } = require("./util")
const { Auth, Product, Wishlist, Cart } = require('./router')
const { banner } = require('./middleware')

app.use('/api/auth', Auth)
app.use('/api/products', Product)
app.use('/api/wishlist', Wishlist)
app.use('/api/cart', Cart)
app.use('/', banner)

app.listen(PORT, () => initializeConnection(PORT))

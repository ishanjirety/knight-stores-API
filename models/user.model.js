const mongoose = require('mongoose')
const Product = require('./product.model')
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username could not be empty"],
    unique: [true, "Username already exists"]
  },
  password: String,
  email: String,
  userType: String,
  securityQuestion: { type: String, required: true },
  answer: { type: String, required: true },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        unique: true,
      },
      quantity:Number
    },
  ],
  wishlist: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      unique: true
    }
  ],
})

const User = mongoose.model("User", UserSchema)

module.exports = User
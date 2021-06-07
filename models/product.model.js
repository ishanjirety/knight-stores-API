const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: String,
    imgUrl:String,
    costPrice: Number,
    sellingPrice: Number,
    discount: Number,
    bestSeller: Boolean,
    sellerName: String,
    reviews: Array,
    rating: String,
})
const Products = mongoose.model('Product', ProductSchema)

module.exports = Products
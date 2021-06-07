const express = require('express')
const router = express.Router()
const { Product, User } = require('../models')
const { verifyJwt } = require('../middleware')
const { logger } = require('../util')


router.route('/')
    // @route Get products
    .get(async (req, res) => {
        try {
            const products = await Product.find({})
            res.status(200).json({
                success: true,
                products: products,
            })
        } catch (e) {
            logger(e.message)
            res.status(500).json({
                success: false,
                error: e.message
            })
        }

    })
    // @route Add product
    .post(verifyJwt, async (req, res) => {
        try {
            const { name, imgUrl, costPrice, sellingPrice, discount, bestSeller, sellerName, reviews, rating, userId } = req.body
            const { userType } = await User.findById(userId)
            if (userType === "admin") {
                const product = new Product({
                    name: name,
                    imgUrl: imgUrl,
                    costPrice: costPrice,
                    sellingPrice: sellingPrice,
                    discount: discount,
                    bestSeller: bestSeller,
                    sellerName: sellerName,
                    reviews: reviews,
                    rating: rating
                })
                const savedProduct = await product.save()
                res.status(201).json({
                    success: true,
                    product: savedProduct
                })
            } else {
                res.status(403).json({
                    success: false,
                    comment: "Unauthorized"
                })
            }
        } catch (e) {
            logger(e.message)
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })
    // @route Update product information 
    .post(verifyJwt, async (req, res) => {

        try {
            const { _id, name, imgUrl, costPrice, sellingPrice, discount, bestSeller, sellerName, reviews, rating, userId } = req.body
            const { userType } = await User.findById(userId)
            if (userType === "admin") {
                await Product.findOneAndUpdate({ _id: _id }, {
                    name: name,
                    imgUrl: imgUrl,
                    costPrice: costPrice,
                    sellingPrice: sellingPrice,
                    discount: discount,
                    bestSeller: bestSeller,
                    sellerName: sellerName,
                    reviews: reviews,
                    rating: rating
                })
                res.status(202).json({
                    success: true,
                    comment: "Product updated successfully"
                })
            } else {
                res.status(403).json({
                    success: false,
                    comment: "Unauthorized"
                })
            }
        } catch (e) {
            logges(e.message)
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })

    // @route Delete product
    .delete(verifyJwt, async (req, res) => {
        try {
            const { _id, userId } = req.body
            const { userType } = await User.findById(userId)
            if (userType === "admin") {
                await Product.findByIdAndDelete({ _id: _id })
                res.status(202).json({
                    success: true,
                    comment: "Product deleted successfully"
                })
            } else {
                res.status(403).json({
                    success: false,
                    comment: "Unauthorized"
                })
            }
        } catch (e) {
            logger(e.message)
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })

module.exports = router
const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middleware')
const { User, Product } = require('../models')


router.use(verifyJwt)

/**
 *  ADD -> POST 
 *  UPDATE -> PATCH 
 *  GET -> GET 
 *  DELETE -> DELETE
 */

router.route('/')
    .get(async (req, res) => {
        const { userId } = req.body
        User.findById(userId).populate({
            path: 'cart',
            populate: {
                path: 'productId',
                populate: 'Product'
            }
        }).exec((err, user) => {
            if (err) {
                res.status(500).json({
                    success: false,
                    error: e.message
                })
            } else {
                res.status(500).json({
                    success: false,
                    data: user.cart
                })
            }
        })
    })
    .post(async (req, res) => {
        try {
            const { userId, _id } = req.body
            await User.updateOne({ _id: userId }, { $push: { cart: { productId: userId, quantity: 1 } } })
            res.status(200).json({
                success: true,
                comment: "Item added successfully"
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })
    .delete(async (req, res) => {
        try {
            const { userId, _id } = req.body
            const { nModified } = await User.updateOne({ _id: userId }, { $pull: { cart: { productId: _id } } })
            if (nModified > 0) {
                res.status(200).json({
                    success: true,
                    comment: "Item removed successfully",
                })
            } else {
                res.status(400).json({
                    success: false,
                    comment: "Could not updated item",
                })
            }
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })
    .patch(async (req, res) => {
        try {
            const { userId, _id, quantity } = req.body
            const doc = await User.findOne({_id:userId})
            item = doc.cart.find(product => product.productId.toString() === _id.toString());
            item["quantity"] = quantity;
            doc.save()
            res.json({
                data:doc.cart
              })
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })

module.exports = router
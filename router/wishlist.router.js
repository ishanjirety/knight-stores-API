const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middleware')
const { User } = require('../models')

router.use(verifyJwt)

router.route('/')
    .get(async (req, res) => {
        try {
            const { userId } = req.body
            await User.findById(userId).populate(
                {
                    path: 'wishlist',
                    populate: 'Product'
                }).exec(function (err, user) {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: e.message
                        })
                    } else {
                        res.status(200).json({
                            success: true,
                            wishlist: user.wishlist
                        })
                    }
                })
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })

    .post(async (req, res) => {
        try {
            const { userId, _id } = req.body
            await User.updateOne({ _id: userId }, { $push: { wishlist: _id } })
            res.status(202).json({
                success: true,
                comment: "Record inserted successfully"
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
            await User.updateOne({ _id: userId }, { $pull: { wishlist: _id } })
            res.status(202).json({
                success: true,
                comment: "Record deleted successfully"
            })
        } catch (e) {
            res.status(500).json({
                success: false,
                error: e.message
            })
        }
    })

module.exports = router
const express = require('express')

const router = express.Router()

const { encryptPassword, decryptPassword } = require('../middleware')
const { signJwt, logger } = require('../util')
const { User } = require('../models')

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username: username })
        if (decryptPassword(password, user.password)) {
            const signedJwt = signJwt(user._id)
            if (signedJwt) {
                res.status(200).json({
                    success: true,
                    data: {
                        token: signedJwt,
                        cart: null,
                        wishlist: null
                    }
                })
            } else {
                res.status(500).json({
                    success: false,
                    error: "Could not generate token"
                })
            }
        } else {
            res.status(401).json({
                success: false,
                error: 'Username and Password mismatched'
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
})

router.post('/signup', encryptPassword, async (req, res) => {
    try {
        const { username, password, email, securityQuestion, answer,userType } = req.body
        const user = new User({
            username: username,
            password: password,
            email: email,
            securityQuestion: securityQuestion,
            answer: answer,
            userType:userType
        })
        await user.save()
        res.status(200).json({
            success:true
        })
    } catch (e) {
        logger(`ERROR:${e.message}`)
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
})

router.post('/forgot-password', encryptPassword, async (req, res) => {
    try {
        const { securityQuestion, answer, username, password } = req.body
        const user = await User.findOne({ username: username, securityQuestion: securityQuestion, answer: answer })
        if (user) {
            await User.findOneAndUpdate({ username: username }, { password: password })
            res.status(200).json({
                success: true,
            })
        } else {
            res.status(404).json({
                success: false,
                error: "Could not find user with specified details"
            })
        }
    } catch (e) {
        res.status(500).json({
            success: false,
            error: e.message
        })
    }
})

router.get('/get-user/:username', async (req, res) => {
    try {
        const { username } = req.params
        const user = await User.findOne({ username: username })
        if (user) {
            res.status(200).json({
                success: true,
                securityQuestion: user.securityQuestion
            })
        } else {
            res.status(404).json({
                success: false,
                error: 'Username not found'
            })
        }
    } catch (e) {
        res.status(503).json({
            success: false,
            error: e.message
        })
    }
})

module.exports = router

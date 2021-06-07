const bcrypt = require('bcryptjs')
const { logger } = require('../util')
// @desc Use this function as middleware to encrypt signup password
// @desc Takes password in request body 

const encryptPassword = (req, res, next) => {
    try {
        const { password } = req.body
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        req.body = { ...req.body, password: hash }
        next()
    } catch (e) {
        logger(`ERROR: ${e.message}`)
        res.status(400).json({
            success: false,
            error: e.message
        })
    }
}

// @desc This function takes supplied password as first parameter
// @desc And encrypted password as second parameter
const decryptPassword = (userPassword, DBPassword) => {
    return bcrypt.compareSync(userPassword, DBPassword);
}
module.exports = { encryptPassword, decryptPassword }

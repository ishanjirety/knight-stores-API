const jwt = require('jsonwebtoken');
const signJwt = (id) => {
    return jwt.sign({id:id},process.env.SECERET,{expiresIn:'24h'})
}
module.exports = signJwt
    
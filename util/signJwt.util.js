const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()
const signJwt = (id) => {
    try{
        return jwt.sign({id:id},process.env.SECRET,{expiresIn:'24h'})
    }catch(e){
        return false
    }
}
module.exports = signJwt
    
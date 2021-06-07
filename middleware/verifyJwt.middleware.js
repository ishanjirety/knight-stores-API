const jwt = require('jsonwebtoken');
    
    const verifyJwt = (req,res,next) => {
    const {authorization} = req.headers
   
      // @desc Checking every route
      try{
        const {id} = jwt.verify(authorization,process.env.SECRET)
        req.body = {...req.body,userId:id}
        next()
      }catch(e){
        res.status(401).json({
            success:false,
            error:e.message
        })
      }
    }
    module.exports = verifyJwt
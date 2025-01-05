const jwt = require('jsonwebtoken')

const AuthMiddleware = async(req,res,next) => {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({
            success:false,
            message:"AuthHeader required"
        });
    }

    const token = authHeader.split(' ')[1]

    try{

        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = decoded.userId

        next()
    }catch(err){
      console.error("Error while Token verification:", err.message);
      res.status(403).json({
      success: false,
      message: err.message,
    });
    }

}

module.exports = {AuthMiddleware}
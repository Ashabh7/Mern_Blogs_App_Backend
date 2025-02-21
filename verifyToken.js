const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const token = req.cookies.token

    if(!token){
        return res.status(401).json("You Are Not Authenticated")
    }

    jwt.verify(token, process.env.SECRET, async (res,data) => {
        if(err){
            return res.status(403).json("Token is Invalid")
        }
        req.userId = data._id
        next()
    })
}

module.exports = verifyToken
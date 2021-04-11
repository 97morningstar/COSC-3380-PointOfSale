const jwt = require("jsonwebtoken");
require("dotenv").confic()

module.exports = async(req,res,next) => {
    try{
        const jwtToken = req.header("token");
        if (!jwtToken){
            return res.status(403).json("Not Authorized");
        }
        const payload = jwt.verify(jwtTocken,process.env.jwtSecret);
        req.user = payload.user;
        
    }catch (err){
        console.error(err.message);
        return res.status(403).json("Not Authorized");
    }
}
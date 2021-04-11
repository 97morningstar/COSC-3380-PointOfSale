const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next) => {
    try{
        console.log("req", req.body);
        const { jwtToken } = req.body;

        console.log("server token", jwtToken);
        if (!jwtToken){
            return res.status(403).json("Not Authorized");
        }
        const payload = jwt.verify(jwtToken,process.env.jwtSecret);
        req.user = payload.user;
        console.log("payload", payload);
        next();
    }catch (err){
        console.error(err.message);
        return res.status(403).json("Not Authorizedd");
    }
}
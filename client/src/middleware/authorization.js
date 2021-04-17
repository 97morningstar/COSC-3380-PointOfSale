const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async(req,res,next) => {
    try{
      
        const { jwtToken } = req.body;
   


      //  console.log("server token", jwtToken);
        if (!jwtToken){
            return res.status(403).json("Not Authorized");
        }
        const payload = jwt.verify(jwtToken,process.env.jwtSecret);
      
        req.type = payload.type;

        console.log("req.user", req.user);
    
        next();



    }catch (err){
        console.error(err.message);
        return res.status(403).json("Token Invalid");
    }
}
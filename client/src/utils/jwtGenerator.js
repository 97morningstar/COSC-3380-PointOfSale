const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator (user_id,is_employee){
    const payload = {
        user: user_id,
        type: is_employee // true for yes false for no
    }
    return jwt.sign(payload,process.env.jwtSecret, {expiresIn:"1hr"})
}

module.exports = jwtGenerator;
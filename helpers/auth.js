const jwt = require('jsonwebtoken');

const SystemConfig = require("../config/system");

module.exports.generateToken = data => {
    let jwtSecretKey = SystemConfig.JWT_SECRET_KEY;
    
    return jwt.sign(data, jwtSecretKey);
}

module.exports.verifyToken = data => {
    let jwtSecretKey = SystemConfig.JWT_SECRET_KEY;
    
    return jwt.verify(data, jwtSecretKey);
}
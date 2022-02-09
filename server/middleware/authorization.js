const jwt = require('jsonwebtoken');
require('dotenv').config()

module.exports = function (req, res, next) {
    console.log('выполняется авторизация ');
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).json(`you are not authorize`)
    }
    try {
        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload
        next();
    } catch (err) {
        console.error(err.message)
        return res.status(401).json(`token is unvalid`)
    }
}
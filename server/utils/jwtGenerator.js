const jwt = require('jsonwebtoken');
require('dotenv').config();

function jwtGenerator(id, email, role){
    const payload = {
        id,
        email,
        role
    }
    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: '24hr'});
}

module.exports = jwtGenerator;
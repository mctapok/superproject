const db = require('../db');


const dash = async (req, res) => {
    try {
        const user = await db.query('select name from users where id = $1', [
            req.user.id
        ]);
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('server error')
    }
}
module.exports = {
    dash
}
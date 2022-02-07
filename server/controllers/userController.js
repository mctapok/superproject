const db = require('../db');

const createUser = async (req, res) => {
    try {
        const result = await db.query(
            "insert into users (id, name, password, email, created_at, created_by, photo_url, role) VALUES($1,$2, $3, $4, $5, $6, $7, $8) returning *",
            [req.body.id, req.body.name, req.body.password, req.body.email, req.body.created_at, req.body.photo_url, req.body.role]);
        res.json({
            data: {
                user: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err.message())
    }
}
const getUser = async (req, res) => {
    try {
        const result = await db.query(
            "select name = $1, created_at = $2, photo_url = $3 from users where id = $4 returning name, created_at, photo_url",
            [req.body.name, req.body.created_at, req.body.photo_url, req.params.id]);
        res.json({
            data: {
                user: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err.message())
    }
}
const updateUser = async (req, res) => {
    try {
        const result = await db.query(
            "update users set (name, password, email, photo_url) VALUES($1,$2, $3, $4, $5) where id = $5 returning *",
            [req.body.name, req.body.password, req.body.email, req.body.photo_url, req.body.role, req.params.id]);
        res.json({
            data: {
                user: result.rows[0],
            }
        })
    } catch (err) {
        console.log(err.message())
    }
}

const deleteUser = async (req, res) => {
    try {
        const result = await db.query(
            'delete from users where id = $1',[req.params.id])
        res.json({
            deleted: result.rows[0],
        })
    } catch(err){
        console.log(err.message())
    }
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser
}
const db = require('../db');
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');


const createUser = async (req, res) => {
    try {
        const now = new Date();
        const {name, email, password, role, created_at} = req.body;
        //check user exist
        const user = await db.query('select * from users where email = $1', [email]);
        if (user.rows.lenght > 0) {
            return res.status(401).send('User already exists')
        }
        //bcrypt
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        //enter user inside db
        const newUser = await db.query('insert into users (name, password, email, role, created_at) values ($1, $2, $3, $4, $5) returning *',
            [name, bcryptPassword, email, role, now]);

        const token = jwtGenerator(newUser.rows[0].id, newUser.rows[0].email, newUser.rows[0].role);
        return res.json({token})


    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await db.query('select * from users where email = $1', [email]);
        if (user.rows.length === 0) {
            return res.status(401).send('password or email is incorrect')
        }
        const validPassword = await bcrypt.compareSync(password, user.rows[0].password);
        if (!validPassword) {
            return res.status(401).json('password or email is incorrect')
        }
        //give jwt token 
        const token = jwtGenerator(user.rows[0].id, user.rows[0].email, user.rows[0].role);
        return res.json({token})

    } catch (err) {
        console.error(err.message)
        res.status(500).send(`server error`)
    }
}

const isVerify = function (req, res, next) {
    try {
        console.log('выполняется ыiverify бэк');
        const token = jwtGenerator(req.user.id, req.user.email, req.user.role)        
        // console.log(token);
        console.log('авторизация завершена')
        return res.json({token})
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error')
    }
}

module.exports = {
    createUser,
    loginUser,
    isVerify
}
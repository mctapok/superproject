const Router = require('express');
const router = new Router();

const userController = require('../controllers/userController');
const authorization = require('../middleware/authorization');
const validInfo = require('../middleware/validInfo');

router.post('/register',validInfo, userController.createUser);
router.post('/login',validInfo, userController.loginUser);
router.get('/isverify', authorization, userController.isVerify)

module.exports = router;
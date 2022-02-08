const Router = require('express');
const router = new Router();

const dashController = require('../controllers/dashController');
const authorization = require('../middleware/authorization');

router.get('/', authorization, dashController.dash);

module.exports = router;
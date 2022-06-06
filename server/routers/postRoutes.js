const Router = require('express');
const router = new Router();
const uploadFile = require('../middleware/uploadFile')
const postController = require('../controllers/postController');


router.post('/post',uploadFile.array('files',10), postController.createPost);
router.get('/posts', postController.allPosts);
router.get('/post/:id', postController.onePost);
router.put('/post:id', postController.updatePost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;
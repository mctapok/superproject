const Router = require('express');
const router = new Router();

const postController = require('./postController');

router.post('/post', postController.createPost);
router.get('/post', postController.allPosts);
router.get('/post/:id', postController.onePost);
router.put('/post', postController.updatePost);
router.delete('/post/:id', postController.deletePost);

module.exports = router;
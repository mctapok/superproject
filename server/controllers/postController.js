const db = require("../db");

//controllers for post
//create post
const createPost = async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    try {
        const postFiles = req.files.map(file => (file.path))
        console.log(postFiles)
        // const files = Object.assign({}, postFiles)
        // console.log(files);

        const newPost = await db.query(
            'INSERT INTO post (title, content, created_at, created_by, user_id, files) VALUES ($1, $2, $3, $4, $5, $6) returning *',
            [req.body.title, req.body.content, req.body.created_at, req.body.created_by, req.body.user_id, postFiles]);
        //получаем id поста для создания папки перемещния файлов

        //апдейтим пост добавляя url паки изображений для img_url  
        res.status(200).json({ 
            post: newPost.rows[0],
            status: 'success'
        })

    } catch (err) {
        console.log(err.message)
    }
}

//get all posts
const allPosts =  async (req, res) => {
    try {
        const allPosts = await db.query('select * from post');
        res.status(200).json({
            status: 'success',
            results: allPosts.rows.length,
            data: {
                allPosts: allPosts.rows
            }
        });
    } catch (err) {
        console.log(err.message)
    }

}
//get post
const onePost =  async (req, res) => {
    try {
        const singlePost = await db.query('select * from post where id = $1', [req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                post: singlePost.rows[0]
            }
        });
    } catch (err) {
        console.log(err.message)
    }
}
//update post
const updatePost = async(req, res) => {
    try {
        const updPost = await db.query("update post set title = $1, content = $2  where id = $3 returning *",
            [req.body.title, req.body.content, req.params.id]);
        res.status(200).json({
            status: 'success',
            data: {
                post: updPost.rows[0]
            }
        })
    } catch(err){
        console.log(err.message)
    }
}
//delete post
const deletePost =  async (req, res) =>{
    try {
        const delPost = await db.query("delete from post where id = $1",[req.params.id]);
        res.status(204).json({
            status: "success",
        });
    } catch(err){
        console.log(err.message);
    }
}

module.exports = {
    createPost,
    deletePost,
    updatePost,
    allPosts,
    onePost
}
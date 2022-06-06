import {$api} from ".";

// export const createDocument = async (document) => {
//     try {
//         console.log('function createDoc')
//         const response = await $api.post('/post',document)
//         console.log('response createdoc', response)
//         return response
//     } catch (err) {
//         console.error(err.message)
//     }
// }
export const getAllPosts = async () => {
    try {
        console.log('function getposts')
        const response = await $api.get('/posts')
        console.log('response getAllposts', response)
        return response
    } catch (err) {
        console.error(err.message)
    }
}
export const uplFiles = async (document, photos) => {
    const formData = new FormData();
    for (const key in document) {
        formData.append(key, document[key])
    }
    for (let i = 0; i < photos.length ; i++) {
        formData.append('files', photos[i])
    }
    try {
        const res = await $api.post('/post',  formData, {
            headers: {
                "Content-type": "multipart/form-data",
            },
        })
        console.log('res: ', res.data.post.files)
        return res
    } catch(err){
        console.error(err.message)
    }
}
export const getDocument = async (id) => { 
    try {
        const response = await $api.get(`/post/${id}`)
        console.log('get document res:', response);
        return response
    } catch (error) {
        console.error(error.message)
    }
 }
import {useEffect, useState} from "react";
import {getAllPosts} from "../http/postApi";
import appImg from '../assets/appImg.jpg'
import './PostList.css'
import {Link} from "react-router-dom";



export default function PostList() {
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const {data} = await getAllPosts()
            setPost(data.data.allPosts)
        }
        fetchData();
    }, [])

    return (
        <div className="post-item">
            {post && post.map(post => (
                <Link to={`post/${post.id}`} key={post.id}> 
                <div className='post-description' key={post.id}>
                    <div className='post-img'>
                        <img className='img-fluid post-img' src={appImg} alt="someroom"/>
                    </div>
                    <div className='post-text'> 
                        <h4 className="post-title">{post.title}</h4>
                        <p className="post-date">Due by {post.created_at}</p>
                        <p className='post-content'>{post.content}</p>
                    </div>                    
                </div>
                </Link>
            ))}
        </div>
    );
};
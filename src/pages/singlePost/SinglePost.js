import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { getDocument } from '../../http/postApi';
import './SinglePost.scss'
import { API_URL } from '../../http';
import Modal from '../../components/Modal';

export default function SinglePost() {
    const [document, setDocument] = useState('')
    const { id } = useParams()
    const [showImage, setShowImage] = useState(false)
    const [selectedImage, setSelectedImage] = useState([])

    console.log('show image *', selectedImage);

    const handleClick = (file) => { 
        setSelectedImage(API_URL + file)
        console.log('image', selectedImage);
        setShowImage(true)
     }

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await getDocument(id)
            console.log("data files: ",data.data.post.files);
            setDocument(data.data.post);
        }
        fetchData();
    }, [])

    return (
        <div className='post-summary'>
            single post
            <h1>{document.title}</h1>
            <div className='post-content'>
                <div>
                    <p className="due-date">{document.created_at}</p>
                    <p className="content">{document.content}</p>
                    <p className='content'>post created by: {document.user_id}</p>
                    <h4>адрес column contacts in db</h4>
                </div>
                <div className='post-map'>
                    <p>карта</p>
                </div>
            </div>
            {!showImage && <div className='img-gallery'>
                {document.files && document.files.map((file, index) => (
                    <div className="img-gallery-item">
                        <img src={API_URL + file}  onClick={()=>handleClick(file)} key={index} className="" alt="..." />
                    </div>
                ))}
            </div>}    
            {showImage && <Modal>
                        <div>
                            <img src={selectedImage}  onClick={() => setShowImage(false)}  className="modal-image" alt="..." />
                        </div>
            </Modal>}
            <button className='btn'>delete</button>
            <button className='btn'>update</button>
        </div>
    );
};

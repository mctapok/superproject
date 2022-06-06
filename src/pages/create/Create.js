import './Create.css';
import {useState} from "react";
import {Rating} from "react-simple-star-rating";
import {useAuthContext} from "../../hooks/useAuthContext";
import {useHistory} from "react-router-dom";
import {uplFiles} from "../../http/postApi";


export default function Create() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(0);
    const [contacts, setContacts] = useState('');
    const [formError, setFormError] = useState(null);
    const [photos, setPhotos] = useState([]);
    const [photosError, setPhotosError] = useState(null);

    const {user} = useAuthContext()
    const history = useHistory()

    const handleRating = (rate) => {
        setRating(rate)
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null)
        if (!title) {
            setFormError('input Title pls')
            return
        }
        if (!description) {
            setFormError('input Description pls')
            return
        }

        const createdBy = {
            userName: user.id,
            email: user.email
        }
        console.log('eto created by: ', createdBy)

        const date = new Date();
        let dateOptions = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
        const document = {
            title,
            content: description,
            rating,
            created_at: date.toLocaleDateString('ru', dateOptions),
            user_id: user.id,
            created_by: createdBy.email,
        }
        console.log('document: ', document)
        console.log('photos ' , photos)
        await uplFiles(document, photos);
        history.push('/')

    }
        const handleFileChange = (e) => {
            let selected = e.target.files
            console.log(selected)
            if (selected.length > 10) {
                setPhotosError('слишком много изображений')
                return;
            }
            if (selected) {
                for (let i = 0; i < selected.length; i++) {
                    if (selected[i].type.includes('image')) {
                    } else {
                        setPhotosError('файл должен быть изображением')
                        return;
                    }
                }
            }
            if (selected.size > 10000000) {
                setPhotosError('размер файла больше 10mb')
                return;
            }
            setPhotosError(null)
            setPhotos(selected)
            console.log('photos updated', selected)
        }


        return (
            <div className='create-form'>
                <h2 className='page-title'>Create new review</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        <span>Review title:</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>
                    <label>
                        <span>description:</span>
                        <textarea
                            required
                            onChange={(e) => setDescription(e.target.value)}
                            value={description}
                        />
                    </label>
                    <label>
                        <div>
                            <Rating onClick={handleRating} ratingValue={rating} size={22}/* Available Props */ />
                        </div>
                    </label>
                    <label>
                        <div>
                            yandex map
                        </div>
                    </label>
                    <label>
                        <span>contacts :</span>
                        <input
                            required
                            type="text"
                            onChange={(e) => setContacts(e.target.value)}
                            value={contacts}
                        />
                    </label>
                    <label>
                        <span>Add photos :</span>
                        <input
                            type="file"
                            multiple
                            name='files'
                            onChange={handleFileChange}
                        />
                    </label>
                    <button className='btn'>Add review</button>
                    {formError && <p className='error'>{formError}</p>}
                </form>
            </div>
        );
    };

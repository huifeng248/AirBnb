import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CreateImage, getImages } from "../../store/image"



function ImageForm({ spotId, onClose }) {
    const dispatch = useDispatch();
    const [image, setImage] = useState("")
    const [errors, setErrors] = useState([])

    const updateFile = (e) => {
        const file = e.target.files[0];
        if (file) setImage(file);
    };



    
    const handleSubmit = (e) => {
        e.preventDefault()
        setErrors([])
        const newImage = {
            image: image
        }
        console.log("handle submit newIMage ~~~~~", newImage)

        dispatch(CreateImage(newImage, spotId))
            .then(() => onClose())
            .catch(async (res) => {
                const data = await res.json()
                if (data && data.errors) setErrors(Object.values(data.errors))
            })
    }


    return (
        <section className='edit_section_container'>
            <div className='edit_title_container'>
                <div className='edit_title'>Add image</div>
                <i
                    onClick={() => onClose()}
                    className="fa-solid fa-x"></i>
            </div>

            <form className='edit_form_container'
                onSubmit={handleSubmit}>
                <ul className='error_message'>
                    {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                    ))}
                </ul>
                <div className='edit_form_info_container'>
                    <div>
                        <label className='modal_label'>
                            Upload Image
                        </label>
                        <input className='edit_input_field'
                            type='file'
                            required
                            onChange={(e) => {updateFile(e)}}
                        />
                    </div>
                </div>
                <button
                    type='submit'
                    className='reserve_button'
                >save
                </button>
            </form>
        </section>
    )
}

export default ImageForm
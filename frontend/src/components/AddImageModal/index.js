import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ImageForm from './ImageForm'
import { useDispatch, useSelector } from 'react-redux';
import './ImageForm.css'

function ImageModal ({spotId}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            {/* the outside button */}
            <button className="reserve_button" onClick={()=>setShowModal(true)}>  
                Add Image
            </button>
            {showModal && 
                (<Modal onClose={()=> setShowModal(false)} spotId={spotId} >
                    <ImageForm onClose={()=> setShowModal(false)} spotId={spotId}/>
                </Modal>
            )}

        </div>
    )
}

export default ImageModal
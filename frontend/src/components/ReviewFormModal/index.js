import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';
import './ReviewForm.css'

function ReviewFormModal ({action,reviewId}) {
    const [showModal, setShowModal] = useState(false)

    return (
        <div>
            {/* the outside button */}
            <button className="edit_outside_button" onClick={()=>setShowModal(true)}>  
                {action} 
            </button>
            {showModal && 
                (<Modal onClose={()=> setShowModal(false)}>
                    <ReviewForm action={action} reviewId={reviewId} onClose={()=> setShowModal(false)} />
                </Modal>
            )}

        </div>
    )
}

export default ReviewFormModal
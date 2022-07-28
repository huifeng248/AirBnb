import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import ReviewForm from './ReviewForm'
import { useDispatch, useSelector } from 'react-redux';


function ReviewFormModal ({action,reviewId}) {
    const [showModal, setShowModal] = useState(false)
    // const user = useSelector(state =>state.session.user)
    
    // console.log("userrrrrr", user)
    // const userId = user.id
    



    return (
        <div>
            {/* the outside button */}
            <button onClick={()=>setShowModal(true)}>  
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
import React, {useState} from 'react'
import {Modal} from '../../context/Modal'
import SpotForm from './SpotForm'
import './SpotForm.css'

function SpotFormModal({action, spotId}) {
    const [showModal, setShowModal] = useState(false)
    
    return (
        <div>
            {/* the outside button */}
            <button className="create_a_spot_button" onClick={()=>setShowModal(true)}>  
                {action} 
            </button>
            {showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SpotForm action={action} spotId={spotId} onClose={()=> setShowModal(false)} />
                </Modal>
            )}

        </div>
    )
}

export default SpotFormModal
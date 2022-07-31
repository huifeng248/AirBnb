import React, {useState} from "react";
import {Modal} from "../../context/Modal"
import SignupForm from "./SignupForm";
import './SignupForm.css'

function SignupFormModal () {
    const [showModal, setShowModal] = useState(false)

    return (
        <div className="home_page_sign_up_button_container">
            <button className="home_page_sign_up_button" onClick={()=> setShowModal(true)}>
                Sign Up
            </button>
            { showModal && (
                <Modal onClose={()=> setShowModal(false)}>
                    <SignupForm/>
                </Modal>
            )

            }
        </div>
    )
}

export default SignupFormModal

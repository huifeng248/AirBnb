// frontend/src/components/LoginFormModal/index.js
import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div>
      <button onClick={() => setShowModal(true)}>Log In</button>
      <div className='log_in_modal_container'>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <LoginForm />
          </Modal>
        )}
      </div>
    </div>
    </>
  );
}

export default LoginFormModal;
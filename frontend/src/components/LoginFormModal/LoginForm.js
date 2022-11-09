// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import "./LoginForm.css"

function LoginForm({ onClose }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(() => onClose())
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          // if (data ) setErrors([data.message]);

        }
      );
  };

  const handleDemo = () => {
    // e.preventDefault();
    setErrors([]);
    setCredential('Demo-lition')
    setPassword('password')
    dispatch(sessionActions.login({ credential, password }))
      .then(() => onClose())
      .catch(
        async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
          // if (data ) setErrors([data.message]);

        }
      );
  };


  return (
    <div className="Modal_Booking_form">
      <form onSubmit={handleSubmit}>
        {/* <h3 className="Log_in_title">Log In</h3> */}
        <div className='Modal_title_container'>
          <div className='Modal_title'> Log In</div>
          <i
            onClick={() => onClose()}
            className="fa-solid fa-x"></i>
        </div>
        <div className="log_in_form_content">
          <div>
            <ul className="sign_up_error_message">
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="booking_form_container">
            <label className='check_in_and_out'>Username or Email</label>
            <input
              className='date_input'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />

            <label className='check_in_and_out'>Password</label>
            <input
              className='date_input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button className='log_in_button' type="submit">Log In</button>
            <button className='demo_button'
              onClick={() => { handleDemo() }
              }> demo</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;

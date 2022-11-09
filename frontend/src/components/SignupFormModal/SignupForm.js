// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupForm({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ email, username, firstName, lastName, password }))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className='Modal_Booking_form'>
      <form onSubmit={handleSubmit}>

        <div className='Modal_title_container'>
          <div className='Modal_title'>Welcome to AbbyBnb</div>
          <i
            onClick={() => onClose()}
            className="fa-solid fa-x"></i>
        </div>
        <div className="log_in_form_content">
          <div>
            <ul className="sign_up_error_message">
              {errors.map((error, idx) => <li key={idx}>{error}</li>)}
            </ul>
          </div>

          <div className="booking_form_container">
            <div className="sign_up_detail">
              <label className='sign_up_label'>
                Email
              </label>
              <input
                className='date_input'
                type="text"
                value={email}
                onChange={(e) => {setEmail(e.target.value)
                  setErrors([])}}
                required
              />
            </div>

            <div className="sign_up_detail">
              <label className='sign_up_label'>
                Username
              </label>
              <input
                className='date_input'
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                  setErrors([])  
                }}
                required
              />
            </div>
            <div className="sign_up_detail">
              <label className='sign_up_label'>
                First Name
              </label>
              <input
                className='date_input'
                type="text"
                value={firstName}
                onChange={(e) => {
                  setErrors([])
                  setFirstName(e.target.value)}}
                required
              />
            </div>
            <div className="sign_up_detail">
              <label className='sign_up_label'>
                Last Name
              </label>
              <input
                className='date_input'
                type="text"
                value={lastName}
                onChange={(e) => {setLastName(e.target.value)
                  setErrors([])
                }}
                required
              />
            </div>
            <div className="sign_up_detail">
              <label className='sign_up_label'>
                Password
              </label>
              <input
                className='date_input'
                type="password"
                value={password}
                onChange={(e) => {setPassword(e.target.value)
                  setErrors([])}}
                required
              />
            </div>
            <div className="sign_up_detail">
              <label className='sign_up_label'>
                Confirm Password
              </label>
              <input
                className='date_input'
                type="password"
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value)
                  setErrors([])}}
                required
              />
            </div>

            <button className="log_in_button" type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;

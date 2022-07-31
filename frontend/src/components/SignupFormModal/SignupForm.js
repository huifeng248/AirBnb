// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css'

function SignupForm() {
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
      <div className= 'Sign_up_form_container'>
        <form onSubmit={handleSubmit}>
            <div>
              <ul>
                  {errors.map((error, idx) => <li key={idx}>{error}</li>)}
              </ul>
            </div>
          <div className="sign_up_form_content_container">
            <div className="sign_up_detail">
              <label>
                  Email
              </label>
              <input
                  className="sign_up_input_field"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
            </div>
            <div className="sign_up_detail">
              <label>
                  Username
              </label>
              <input
                  className="sign_up_input_field"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  />
            </div>
            <div className="sign_up_detail">
              <label>
                  First Name
              </label>
              <input
                className="sign_up_input_field"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="sign_up_detail">
              <label>
                  Last Name
              </label>
              <input
              className="sign_up_input_field"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              />
            </div>
            <div>

              <label className="sign_up_detail">
                  Password
              </label>
              <input
                className="sign_up_input_field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="sign_up_detail">
                Confirm Password
              </label>
              <input
                className="sign_up_input_field"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
              
            <button className="submit_buton" type="submit">Sign Up</button>
            </div>
        </form>
    </div>
  );
}

export default SignupForm;

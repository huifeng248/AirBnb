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

  // const handleDemo = (e) => {
  //   // e.preventDefault();
  //   setErrors([]);
  //   setCredential('Demo-lition')
  //   setPassword('password')
  //   return dispatch(sessionActions.login({ credential, password })).catch(
  //     async (res) => {
  //       const data = await res.json();
  //       if (data && data.errors) setErrors(data.errors);
  //       // if (data ) setErrors([data.message]);

  //     }
  //   );
  // };


  return (
    <div className="Login_form_container">
      <form onSubmit={handleSubmit}>
        <h3 className="Log_in_title">Log In</h3>
        <div className="log_in_form_content">
          <div>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
          </div>
          <div className="Log_in_info_container">
            <div className="usename_email">
              <div>

                <label>
                  Username or Email
                </label>
              </div>
              <input
                className="modal_input_field"
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div className="password">
              <label>
                Password
              </label>
              <input
                className="modal_input_field"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

          </div>
          <button className='log_in_button' type="submit">Log In</button>
        </div>
      </form>
      <button className='demo_button'
        onClick={() => { setCredential('Demo-lition'); setPassword('password') }}
      > demo</button>
    </div>
  );
}

export default LoginForm;

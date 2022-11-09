// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import './Navigation.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory()
 
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(()=>history.push("/"))
  };

  return (
    <>
      <div className="profile-dropdown-container">
        <div className="menu_container" onClick={openMenu}>
          <i className="fa-solid fa-bars"></i>
          <i className="fas fa-user-circle" />
        </div>
        {showMenu && (
          <div>
            <div className="profile-dropdown">
              {/* <li>{user.username}</li> */}
              <div>{user.firstName} {user.lastName}</div>
              <div>{user.email}</div>
              <div className="drop_down_items" >
                <Link to={'/spots/current'} style={{ textDecoration:'none' }}> Manage Listings</Link>
              </div>
              <div className="drop_down_items">
                <Link  to={'/reviews/current'}> Manage Reviews</Link>
              </div>
              <div className="drop_down_items">
                <Link  to={'/bookings/current'}> Manage Bookings</Link>
              </div>
              {/* <div className='drop_down_items' > */}
                <div className="log_out_button drop_down_items" onClick={logout}>Log Out</div>
              {/* </div> */}
            </div>
          </div>
        )}

      </div>
    </>
  );
}

export default ProfileButton;

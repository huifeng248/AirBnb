// frontend/src/components/Navigation/ProfileButton.js
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Redirect, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";


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
      <button onClick={openMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          {/* <li>{user.username}</li> */}
          <li>{user.firstName} {user.lastName}</li>
          <li>{user.email}</li>
          {/* <li onClick={(e)=> {return (<Redirect to ='/spots/new'/>)}}> */}
          {/* <li onClick={(e)=> {history.push('/spots/new')}}>
            Manage Listings
          </li> */}
          <li>
            <Link to={'/spots/current'}> Manage Listings</Link>
          </li>
          <li>
            <Link to={'/reviews/current'}> Manage Reviews</Link>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;

// frontend/src/components/Navigation/index.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        {/* <NavLink to="/signup">Sign Up</NavLink> */}
      </>
    );
  }

  return (
    <div className='Banner'>
    <div className='navigation_container'>
        <div>
          {/* <NavLink exact to="/">Home</NavLink> */}
          <NavLink className='left_navigation_container' exact to="/">
            <img className='logo' src='https://logosarchive.com/wp-content/uploads/2021/08/Airbnb-icon.svg' alt='airbnb logo'></img>
            {/* <img className='logo' src="/Users/huifeng/Documents/App_Academy/Projects/AirBnb/frontend/public/Fav2/android-chrome-192x192.png" ></img> */}
            <div className='home_page_name'>abbybnb</div>
          </NavLink>
        </div>
      <div className='session_link'>
        {isLoaded && sessionLinks}
      </div>
    </div>
    </div>
  
  );
}

export default Navigation;

import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import "../App.css"
import { auth } from '../loginAuthentication/firebase/FirebaseConfig';
import { signOut } from "firebase/auth";
// import { useAuth } from "./../loginAuthentication/firebase/FirebaseAuth"

// SampleProfileUrl - https://images.pexels.com/photos/1742370/pexels-photo-1742370.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500
const HeaderNavbarLogin = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigateToNextPage = useNavigate();
  const {isLoggedinUser, setLoggedInUser} = props;
  // const useAuthData = useAuth();


  function logoutOnclick(isClick = false) {
    isClick = true
    if(isClick) {
      auth.signOut();
    } else {
      signOut(auth).then(() => {
        console.log("GLogin Successfully loggedOut")
      }).catch((e) => {
        console.error("Sign out error-->",e)
      })
    }

    localStorage.removeItem("loggedInData");
    setLoggedInUser(false);
    navigateToNextPage("/");
    return;
  }

  useEffect(() => {
    // console.log("header screen--useAuthData--",useAuthData)
    const checkScreenSize = () => {
      if (window.innerWidth > 480) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', checkScreenSize);
    checkScreenSize();
    
    return () => {
      window.removeEventListener("resize", checkScreenSize)
    };
  }, [])

  // Using 'NavLink' to know the active item
  return (
    <div className="header-navbar">
        <h2 className='header-appName'>Javascript <span className='app-highlight'>Crud</span> with SampleTasks</h2>
        {isLoggedinUser?.loginSuccess ? (
          <nav>
            <div className='menu' onClick={() => {
              setMenuOpen(!menuOpen)
            }}>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <ul className={menuOpen ? 'open-headerList' : 'header-list'}>
              <li><NavLink to={"/home"}>Home</NavLink></li>
              <li><NavLink to={"/dashboard"}>Dashboard</NavLink></li>
              <li><NavLink to={"/fetch-api"}>FetchApi</NavLink></li>
              <li><NavLink to={"/demo-tasks"}>Other tasks</NavLink></li>
              <li className='header-listItem'>
                  <img alt='' className='header-avatar' src={isLoggedinUser?.loggedInPhotoUrl || "favicon1.ico"}/>
              </li>
              <li className='listItemUserTitle'>Welcome! <b>{isLoggedinUser?.loggedInUsername}</b></li>
              <button className='listItemLogout' onClick={logoutOnclick}>Logout</button>
            </ul>
          </nav>
        ) : (<Link className='header-loginhere' to="/">Login Here</Link>)}
    </div>
  )
}

export default HeaderNavbarLogin;
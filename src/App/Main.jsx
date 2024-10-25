import './app.css'
import React from 'react'
import profileImageDefault from "./../assets/profileImageDefault.jpg"
import { useAuth } from '../contexts/authContext'
import {Link} from "react-router-dom"




export default function Main() {
  const { currentUser, userLoggedIn } = useAuth()


  console.log('currentUser:', currentUser);  // Debugging line
  console.log('userLoggedIn:', userLoggedIn);  // Debugging line


  return (
    <>
    <section className='app-section'>
      <div className="container">
      {
        userLoggedIn
        ?
        <>
          <h1>The Main App Page</h1>
          <h3>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email}, and email verified: {currentUser.emailVerified ? "Yes" : "No"}</h3>
          <img src={currentUser.photoURL ? currentUser.photoURL : profileImageDefault} alt="User Profile" />
        </>
          :
          <h1 className='noLoginMSG'>Sorry, you should login to start using this app <Link to={"/login"}>Continue to login</Link></h1>
        }
        </div>
    </section>
    </>
  )
}

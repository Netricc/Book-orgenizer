import './app.css'
import React from 'react'
import { useAuth } from '../contexts/authContext'



export default function Main() {
  const { currentUser } = useAuth()

  return (
    <>
    <h1>The Main App Page</h1>
    <h3>Hello {currentUser.displayName ? currentUser.displayName : currentUser.email} and you : {currentUser.emailVerified == true ? "yes" : "No"}</h3>
    </>
  )
}

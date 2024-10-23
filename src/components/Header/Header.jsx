import "./header.css"
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/authContext/index.jsx'
import { doSignOut } from '../../firebase/auth.js'

export default function Header() {

  const navigate = useNavigate()
  const { userLoggedIn } = useAuth()

  return (
    <header className="header">
      <div className="container">
        <Link to={"/"} className="logo">Readly</Link>

        <nav className="navigation">
          <ul className="pages">
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/app"}>App</Link></li>
            <li><Link to={"/about"}>About</Link></li>
          </ul>
          
          <div className="searchAccount">
            <div className="searchinput">
              <input type="text" placeholder="Search For Book..." />
              <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {
              userLoggedIn
                ? 
                <>
                  <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }}>
                    <i className="fa-solid fa-right-from-bracket"></i>
                  </button>
                </>
                : 
                <button>
                  <Link to={"/login"}>
                    <i className="fa-solid fa-user"></i>
                  </Link>
                </button>
            }
          </div>
        </nav>
      </div>
    </header>
  )
}

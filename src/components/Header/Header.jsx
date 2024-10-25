import "./header.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileImageDefault from "../../assets/profileImageDefault.jpg";

import { useAuth } from '../../contexts/authContext';
import { doPasswordReset, doPasswordChange, doSendEmailVerification } from '../../firebase/auth.js';
import { doSignOut } from '../../firebase/auth.js';

export default function Header() {
  const navigate = useNavigate();
  const { currentUser, userLoggedIn } = useAuth();
  const ProfileImage = currentUser?.photoURL ? currentUser.photoURL : profileImageDefault;
  
  const [email, setEmail] = useState(currentUser?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleShowUserCard = () => {
    const card = document.getElementById("UserCard");
    card.classList.add("show-card");
  };

  const handleCloseUserCard = () => {
    const card = document.getElementById("UserCard");
    card.classList.remove("show-card");
  };

  const handlePasswordReset = async () => {
    try {
      await doPasswordReset(email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setMessage("Error resetting password.");
    }
  };

  const handlePasswordChange = async () => {
    try {
      await doPasswordChange(newPassword);
      setMessage("Password updated successfully!");
    } catch (error) {
      setMessage("Error updating password.");
    }
  };

  const handleSendVerification = async () => {
    try {
      await doSendEmailVerification();
      setMessage("Verification email sent!");
    } catch (error) {
      setMessage("Error sending verification email.");
    }
  };

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
            {userLoggedIn ? (
              <>
                <button className="User-btn" onClick={handleShowUserCard}>
                  <img src={ProfileImage} alt="" />
                </button>
                <button
                  onClick={() => {
                    doSignOut().then(() => navigate("/login"));
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket"></i>
                </button>
              </>
            ) : (
              <button>
                <Link to={"/login"}>
                  <i className="fa-solid fa-user"></i>
                </Link>
              </button>
            )}
          </div>
        </nav>
        {currentUser && (
          <div className="UserCard" id="UserCard">
            <header>
              <span>User Info</span>
              <button onClick={handleCloseUserCard}>
                <i className="fa-solid fa-circle-xmark"></i>
              </button>
            </header>
            <div className="content">
              <h3>Hey {currentUser.displayName || currentUser.email.split('@')[0]}</h3>
              <div className="hr"></div>
              <span>{currentUser.email}</span>
              <p>
                Your Account is {currentUser.emailVerified ? "Verified ✅" : "Not Verified ❌"}
              </p>

              {/* Password Reset */}
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handlePasswordReset}>Reset Password</button>

              {/* Password Change */}
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button onClick={handlePasswordChange}>Change Password</button>

              {/* Email Verification */}
              <button className="verificationEmail-btn" onClick={handleSendVerification}>
                Send Verification Email
              </button>

              {message && <p className="message">{message}</p>}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

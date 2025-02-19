import React from "react";
import logo from "../assets/logo.png";
import "./styles.css";

const page = () => {

    return (
        <nav className="navbar">
            <div className="container">
                {/* LOGO */}
                <a href="#" className="logo">
                    <img src={logo} alt="Logo" />
                </a>
            </div>

            {/* LINKS */}
            <div className="nav-buttons">
                <button className="nav-btn">Home</button>
                <button className="nav-btn">About</button>
                <button className="nav-btn">Journals</button>

                {/* AUTH BUTTONS */}
                <button className="login-btn">Log in</button>
                <button className="signup-btn">Sign up</button>
            </div>
        </nav>
    )
}

export default page
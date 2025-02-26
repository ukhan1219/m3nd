import React from "react";
import logo from "../assets/logo.png";

const footer = () => {
    return(
        <footer className="bg-[#262f50] py-6 text-center text-white">
            
            {/* LOGO */}
            <div className="flex justify-center mb-6">
                <img src={logo} alt="Logo" className="h-7" />
            </div>

            {/* NAVIGATION LINKS */}

            {/* 
                need to add links with
                    Link to="/homePage"
                    Link to="/aboutPage"
                    Link to="/journalsPage"
                    Link to="/contactPage"
            */}
            <nav className="mb-6">
                <ul className="flex justify-center space-x-6 text-sm tracking-wide">
                    <li className="cursor-pointer hover:underline"> HOME </li>
                    <span>|</span>
                    <li className="cursor-pointer hover:underline"> ABOUT </li>
                    <span>|</span>
                    <li className="cursor-pointer hover:underline"> JOURNALS </li>
                    <span>|</span>
                    <li className="cursor-pointer hover:underline"> CONTACT </li>
                </ul>
            </nav>

            {/* TERMS AND PRIVACY */}
            <div className="text-xs text-gray-300 tracking-wider">
                <span className="cursor-pointer hover:underline"> TERMS AND CONDITIONS </span> |
                <span className="cursor-pointer hover:underline"> PRIVACY POLICY </span>
            </div>

        </footer>
    )
}

export default footer;
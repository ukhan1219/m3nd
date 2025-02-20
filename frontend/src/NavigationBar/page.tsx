import React from "react";
import logo from "../assets/logo.png";

const page = () => {
    const navButtons = "text-[#262f50] text-sm px-4 py-2 rounded-lg hover:text-[#1a1a35]"

    return (
        <nav className="fixed top-0 left-0 w-full bg-[#d5ddfa] p-5 flex items-center justify-between shadow-md z-50">
            {/* LOGO */}
            <a href="#" className="flex items-center">
                <img src={logo} alt="Logo" className="h-7" />
            </a>

            {/* LINKS */}
            <div className="flex items-center gap-3">
                <button className={navButtons}>
                    Home
                </button>
                <button className={navButtons}>
                    About
                </button>
                <button className={navButtons}>
                    Journals
                </button>

                {/* AUTH BUTTONS */}
                <button className="bg-[#262f50] text-[#d5ddfa] px-4 py-2 rounded-full text-sm hover:bg-[#2c2c92]">
                    Log in
                </button>
                <button className="border-2 border-[#262f50] text-[#262f50] px-4 py-2 rounded-full text-sm hover:bg[#1a1a751">
                    Sign up
                </button>
            </div>
        </nav>
    )
}

export default page;
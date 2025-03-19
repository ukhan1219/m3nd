import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../assets/mend-logo.svg";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleNav = () => {
    setNav(!nav);
  };
  

  const handleLogout = () => {
    logout();
    navigate("/"); // Optionally redirect after logout
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="bg-lightlavender text-darkblue p-3 font-Dongle fixed top-0 left-0 w-full z-50">
      <div className="px-4 2xl:px-12 mx-auto flex justify-between items-center">
        {/* LOGO */}
        <a
          href="/"
          className="flex items-center logo-svg fill-darkblue hover:text-midblue"
        >
          <img
            src={logo}
            alt="Logo"
            className="h-12 hover:opacity-80 transition-all duration-300 ease-in-out"
          />
        </a>

        {/* Desktop Menu */}
<<<<<<< HEAD
<div className="hidden md:flex items-center space-x-6 text-2xl 2xl:text-3xl font-normal">
  <a href="/" className="nav-link hover:text-midblue">Home</a>
  <a href="/about" className="nav-link hover:text-midblue">About</a>
{/* 
  <div>
    {user && (
      <div className="relative group">
        <button className="flex items-center space-x-2 cursor-pointer hover:text-midblue">
          <span>{user.name}</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 11.121a4.75 4.75 0 016.708 0M15 19l-2 2-2-2m2-2v6" />
          </svg>
        </button>

        <div className="absolute hidden group-hover:flex flex-col bg-lightlavender border border-darkblue shadow-lg rounded-lg w-36 right-0 mt-2">
          <a href="/profile" className="px-4 py-2 hover:bg-midblue transition-all">Profile</a>
          <a href="/" className="px-4 py-2 hover:bg-midblue transition-all">Sign Out</a>
=======
        <div className="hidden md:flex items-center space-x-6 text-2xl 2xl:text-3xl font-normal">
          <a href="/" className="nav-link hover:text-midblue">
            Home
          </a>
          <a href="/about" className="nav-link hover:text-midblue">
            About
          </a>
          {user && (
            <>
              <button
                onClick={handleDashboard}
                className="nav-link hover:text-midblue"
              >
                Dashboard
              </button>
              <a href="/dashboard" className="nav-link hover:text-midblue">
                Journals
              </a>
            </>
          )}
          {!user ? (
            <>
              <a href="/login">
                <button className="border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-10 py-0 rounded-full text-2xl 2xl:text-3xl hover:bg-midblue">
                  Log in
                </button>
              </a>
              <a href="/signup">
                <button className="border-2 border-darkblue transition-all duration-[150ms] text-darkblue hover:text-pearl px-10 py-0 rounded-full text-2xl 2xl:text-3xl hover:bg-darkblue">
                  Sign up
                </button>
              </a>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-10 py-0 rounded-full text-2xl 2xl:text-3xl hover:bg-midblue"
            >
              Logout
            </button>
          )}
>>>>>>> fecc2a4 (auth context)
        </div>
      </div>
    )}
  </div>
*/}

  {!user ? (
    <>
      <a href="/login">
        <button className="border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-10 py-0 rounded-full text-2xl 2xl:text-3xl hover:bg-midblue">
          Log in
        </button>
      </a>
      <a href="/signup">
        <button className="border-2 border-darkblue transition-all duration-[150ms] text-darkblue hover:text-pearl px-10 py-0 rounded-full text-2xl 2xl:text-3xl hover:bg-darkblue">
          Sign up
        </button>
      </a>
    </>
  ) : null}
</div>


        {/* Mobile Menu Icon */}
        <div className="block md:hidden cursor-pointer" onClick={handleNav}>
          {nav ? <AiOutlineClose size={28} /> : <AiOutlineMenu size={28} />}
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`fixed top-0 right-0 w-full h-full bg-lightlavender text-darkblue flex flex-col items-center justify-start space-y-8 transform transition-all duration-500 ease-in-out ${nav ? "translate-x-0" : "translate-x-full"} md:hidden`}
      >
        <li className="absolute top-6 right-6">
          <AiOutlineClose
            size={28}
            className="cursor-pointer"
            onClick={handleNav}
          />
        </li>
        <li className="text-2xl translate-y-20">
          <a
            href="/"
            onClick={handleNav}
            className="nav-link text-4xl hover:text-midblue"
          >
            Home
          </a>
        </li>
        <li className="text-2xl translate-y-20">
          <a
            href="/about"
            onClick={handleNav}
            className="nav-link text-4xl hover:text-midblue"
          >
            About
          </a>
        </li>
        {user && (
          <>
<<<<<<< HEAD
          <li className="text-2xl translate-y-20">
            <a href="/dashboard" onClick={handleNav} className="nav-link text-4xl hover:text-midblue">Journals</a>
          </li>
          <li>
          <a href="/">
            <button className="translate-y-20 border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-10 py-0 rounded-full text-4xl hover:bg-midblue">
              Sign Out
            </button>
          </a>
        </li>
        </>
=======
            <li className="text-2xl translate-y-20">
              <button
                onClick={() => {
                  handleDashboard();
                  handleNav();
                }}
                className="nav-link text-4xl hover:text-midblue"
              >
                Dashboard
              </button>
            </li>
            <li className="text-2xl translate-y-20">
              <a
                href="/dashboard"
                onClick={handleNav}
                className="nav-link text-4xl hover:text-midblue"
              >
                Journals
              </a>
            </li>
          </>
>>>>>>> fecc2a4 (auth context)
        )}
        {!user ? (
          <>
            <li>
              <a href="/login">
                <button className="translate-y-20 border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-10 py-0 rounded-full text-4xl hover:bg-midblue">
                  Log in
                </button>
              </a>
            </li>
            <li>
              <a href="/signup">
                <button className="translate-y-20 border-2 border-darkblue transition-all duration-[150ms] text-darkblue hover:text-pearl px-8 py-0 rounded-full text-4xl hover:bg-darkblue">
                  Sign up
                </button>
              </a>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={() => {
                handleLogout();
                handleNav();
              }}
              className="translate-y-20 border-2 border-darkblue bg-darkblue transition-all duration-[150ms] text-pearl px-8 py-0 rounded-full text-4xl hover:bg-midblue"
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;

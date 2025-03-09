import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/mend-logo.svg";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [user, setUser] = useState(null);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <nav className="bg-lightlavender text-darkblue p-4 font-Dongle fixed top-0 left-0 w-full z-50">
      <div className="px-4 2xl:px-12 mx-auto flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center logo-svg fill-darkblue hover:text-midblue">
          <img src={logo} alt="Logo" className="h-12 hover:opacity-80 transition-all duration-300 ease-in-out" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-2xl 2xl:text-3xl font-normal">
          <a href="/" className="nav-link hover:text-midblue">Home</a>
          <a href="/about" className="nav-link hover:text-midblue">About</a>
          {user && <a href="/journals" className="nav-link hover:text-midblue">Journals</a>}
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
          <AiOutlineClose size={28} className="cursor-pointer" onClick={handleNav} />
        </li>
        <li className="text-2xl translate-y-20">
          <a href="/" onClick={handleNav} className="nav-link text-4xl hover:text-midblue">Home</a>
        </li>
        <li className="text-2xl translate-y-20">
          <a href="/about" onClick={handleNav} className="nav-link text-4xl hover:text-midblue">About</a>
        </li>
        {user && (
          <li className="text-2xl translate-y-20">
            <a href="/journals" onClick={handleNav} className="nav-link text-4xl hover:text-midblue">Journals</a>
          </li>
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
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;

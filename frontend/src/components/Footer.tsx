import { useState } from "react";
import logo2 from "../assets/mend-logo-2.svg";

const Footer = () => {
  const [user, setUser] = useState(null); 
  return (
    <div className="w-full py-8 max-sm:py-5 max-sm:px-5 px-10 flex flex-col items-center gap-4 bg-darkblue text-pearl">
      <a href="/" className="flex justify-center hover:opacity-80 transition-all duration-300 ease-in-out">
        <img src={logo2} alt="Logo" className="h-10" />
      </a>
      <ul className="w-full flex justify-center">
        <li className="flex flex-row max-[350px]:text-2xl justify-center space-x-4 text-2xl font-Dongle 2xl:text-3xl">
          <a href="/" className="hover:text-[#B9C3DA] nav-link2">HOME</a><p className="font-extrabold">{" | "}</p>
          <a href="/about" className="hover:text-[#B9C3DA] nav-link2">ABOUT</a><p className="font-extrabold">{" | "}</p>
          {user ? (
            <a href="/journals" className="hover:text-[#B9C3DA] nav-link2">JOURNALS</a>
          ) : (
            <>
              <a href="/login" className="hover:text-[#B9C3DA] nav-link2">LOGIN</a><p className="font-extrabold">{" | "}</p>
              <a href="/signup" className="hover:text-[#B9C3DA] nav-link2">SIGNUP</a>
            </>
          )}
        </li>
      </ul>
      <p className="flex justify-center font-Dongle text-xl 2xl:text-2xl ">
            Created with love by a group of UCF students<span className="pl-1">{"\u2665"}</span>.
      </p>
    </div>
  );
};

export default Footer;

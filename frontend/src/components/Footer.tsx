import React from "react";
import logo2 from "../assets/mend-logo-2.svg";

const Footer = () => {
  return (
    <div className="w-full py-8 max-sm:py-5 max-sm:px-5 px-10 flex flex-col items-center gap-4 bg-darkblue text-pearl">
      <a href="/" className="flex justify-center">
        <img src={logo2} alt="Logo" className="h-12" />
      </a>
      <ul className="w-full flex justify-center">
        <li className="flex flex-row max-[350px]:text-2xl justify-center space-x-4 text-2xl font-Dongle 2xl:text-3xl">
          <a href="/" className="hover:text-[#B9C3DA] nav-link2">HOME</a><p className="font-extrabold">{" | "}</p>
          <a href="/about" className="hover:text-[#B9C3DA] nav-link2">ABOUT</a><p className="font-extrabold">{" | "}</p>
          <a href="/journals" className="hover:text-[#B9C3DA] nav-link2">JOURNALS</a>
        </li>
      </ul>
      <p className="flex justify-center font-Dongle text-xl 2xl:text-2xl ">
            Created with love by a group of UCF students.
      </p>
    </div>
  );
};

export default Footer;

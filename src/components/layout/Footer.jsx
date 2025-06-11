import React from "react";
import logo from "@/assets/images/logo.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative flex gap-25 text-gray-600 text-sm px-24 pt-11 pb-20">
      <div>
        <img className="w-23 h-5" src={logo} alt="logo" />
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Content</h6>
        <Link>Quizzes</Link>
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Contact us</h6>
        <p>Email: quizwiz@gmail.com</p>
        <p>Tel: +995 328989</p>
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Social media</h6>
        <a href="">Facebook</a>
        <a href="">Linkedin</a>
      </div>

      <p className="absolute bottom-6 right-19">
        &copy; 2024 QW. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;

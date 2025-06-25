import React from "react";

import { Link } from "react-router-dom";

import logo from "@/assets/images/logo.png";
import { useQuery } from "@tanstack/react-query";
import { fetchSocials } from "@/services";

function Footer() {
  const { data, isLoading } = useQuery({
    queryKey: ["socials"],
    queryFn: fetchSocials,
  });

  if (isLoading)
    return (
      <footer className="relative flex gap-25 text-gray-600 text-sm px-24 pt-11 pb-20 border-t border-gray-300">
        Loading...
      </footer>
    );

  const contacts =
    data?.filter((item) => item.key === "email" || item.key === "phone") || [];

  const socialMedia =
    data?.filter((item) => item.key != "email" && item.key != "phone") || [];

  return (
    <footer className="relative flex gap-25 text-gray-600 text-sm px-24 pt-11 pb-20 border-t border-gray-300">
      <div>
        <img className="w-23 h-5" src={logo} alt="logo" />
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Content</h6>
        <Link to="/quizzes">Quizzes</Link>
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Contact us</h6>
        {contacts?.map((contact) => (
          <p key={contact.id}>
            {contact.key.charAt(0).toUpperCase() +
              contact.key.slice(1) +
              ": " +
              contact.value}
          </p>
        ))}
      </div>

      <div className="flex flex-col gap-6">
        <h6 className="font-bold text-black">Social media</h6>
        {socialMedia?.map((social) => (
          <a
            key={social.id}
            href={social.value}
            target="_blank"
            rel="noreferrer"
          >
            {social.key.charAt(0).toUpperCase() + social.key.slice(1)}
          </a>
        ))}
      </div>

      <p className="absolute bottom-6 right-19">
        &copy; 2024 QW. All rights reserved
      </p>
    </footer>
  );
}

export default Footer;

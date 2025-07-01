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
    data?.filter((item) => item.key === "email" || item.key === "tel") || [];

  const socialMedia =
    data?.filter((item) => item.key != "email" && item.key != "tel") || [];

  return (
    <footer className="relative flex flex-col md:flex-row gap-10 md:gap-25 text-gray-600 text-sm px-10 py-6 md:px-24 md:pt-11 md:pb-6 border-t border-gray-300">
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
            href={
              social.value.startsWith("http://") ||
              social.value.startsWith("https://")
                ? social.value
                : `https://${social.value}`
            }
            target="_blank"
            rel="noreferrer"
          >
            {social.key.charAt(0).toUpperCase() + social.key.slice(1)}
          </a>
        ))}
      </div>

      <div className="flex flex-col-reverse md:ml-auto md:min-h-45 mt-3.5 md:mt-0">
        <p className="md:mt-auto text-xs font-raleway font-normal">
          &copy; 2024 QW. All rights reserved
        </p>
      </div>
    </footer>
  );
}

export default Footer;

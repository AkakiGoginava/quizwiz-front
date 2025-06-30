import React from "react";

import { Link } from "react-router-dom";

import { landingCover, logoBig } from "@/assets";
import { LinkIcon } from "@/components";

import { useLanding } from "./useLanding";

function Landing() {
  const { quizCount, categoryCount } = useLanding();

  return (
    <div className="relative flex flex-col w-full">
      <img
        className="h-35 md:h-75 w-75 md:w-165 mt-5 md:mt-7 mb-3 md:mb-28 ml-12 md:ml-24"
        src={logoBig}
      />

      <img
        className="transform- -translate-x-[4rem] md:-translate-x-0 min-h-124 min-w-124 md:absolute md:bottom-0 md:right-0"
        src={landingCover}
      />

      <div className="flex flex-col justify-center w-full bg-orange text-white font-raleway font-black pl-12 md:pl-24 pt-8 pb-14.5">
        <p className="text-7.5xl">{quizCount ? quizCount : "N/A"}+</p>

        <div className="flex items-center gap-4">
          <Link to="/quizzes" className="peer text-5xl hover:underline">
            Quiz games
          </Link>

          <LinkIcon className="hidden peer-hover:block" />
        </div>
      </div>

      <div className="flex flex-col justify-center w-full bg-blue text-white font-raleway font-black pl-12 md:pl-24 pb-9.5">
        <p className="text-7.5xl">{categoryCount ? categoryCount : "N/A"}+</p>

        <div className="flex md:items-center gap-4">
          <Link
            to="/quizzes"
            className="peer text-5xl hover:underline max-w-50 md:max-w-100"
          >
            Different genre
          </Link>

          <LinkIcon className="hidden peer-hover:block mt-3 md:mt-0 ml-5 md:ml-0" />
        </div>
      </div>
    </div>
  );
}

export default Landing;

import React from "react";
import { landingCover, logoBig } from "@/assets";

function Landing() {
  return (
    <div className="relative flex flex-col w-full">
      <img className="h-75 w-165 mt-7 mb-28 ml-24" src={logoBig} />

      <div className="flex flex-col justify-center w-full bg-orange text-white font-raleway pl-24 pt-8 pb-14.5">
        <p className="text-7.5xl">200+</p>
        <p className="text-5xl">Quiz games</p>
      </div>

      <div className="flex flex-col justify-center w-full bg-blue text-white font-raleway pl-24 pb-9.5">
        <p className="text-7.5xl">25+</p>
        <p className="text-5xl">Different genre</p>
      </div>

      <img className="absolute bottom-0 right-0" src={landingCover} />
    </div>
  );
}

export default Landing;

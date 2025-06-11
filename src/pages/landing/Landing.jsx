import React from "react";
import logoBig from "@/assets/images/logo-big.png";
import landingImg from "@/assets/images/landing-img.png";

function Landing() {
  return (
    <div className="relative flex flex-col w-full">
      <img className="h-75 w-165 mt-7 mb-28 ml-24" src={logoBig} />

      <div className="flex flex-col justify-center w-full bg-orange text-white font-raleway pl-24 pt-8 pb-14.5">
        <p className="text-[5rem]">200+</p>
        <p className="text-5xl">Quiz games</p>
      </div>

      <div className="flex flex-col justify-center w-full bg-blue text-white font-raleway pl-24 pb-9.5">
        <p className="text-[5rem]">25+</p>
        <p className="text-5xl">Different genre</p>
      </div>

      <img className="absolute bottom-0 right-0" src={landingImg} />
    </div>
  );
}

export default Landing;

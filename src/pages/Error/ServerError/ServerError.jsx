import { serverErrorCover } from "@/assets";
import { HomeArrowIcon } from "@/components";
import React from "react";
import { Link } from "react-router-dom";

function ServerError() {
  return (
    <div className="flex flex-col gap-8 md:gap-12 items-center py-10 md:py-15 w-full">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="font-black text-6xl font-raleway text-center">
          Internal server error!
        </h1>
        <h3 className="text-lg font-bold">Error 500</h3>
      </div>

      <img
        src={serverErrorCover}
        className="w-49 md:w-70 h-56 md:h-80"
        alt="404 cover"
      />

      <Link
        to="/"
        className="flex gap-2 items-center transition hover:cursor-pointer hover:opacity-80"
      >
        <HomeArrowIcon className="min-h-9 min-w-9" />
        <span className="font-blue text-lg text-blue">Go Home</span>
      </Link>
    </div>
  );
}

export default ServerError;

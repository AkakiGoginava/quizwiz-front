import React from "react";

import { cn } from "@/helper";
import { SearchIcon, CrossIcon } from "@/components";
import { useSearchBar } from "./useSearchBar";
import clsx from "clsx";

function SearchBar() {
  const { isOpen, inputRef, openSearch, closeSearch, onSubmit } =
    useSearchBar();

  return (
    <div
      className={clsx({
        "absolute md:static inset-0 w-screen md:w-auto h-screen md:h-auto bg-white md:bg-transparent z-100 md:z-0":
          isOpen,
      })}
    >
      <div
        className={cn("flex border border-transparent items-center px-3", {
          "border-light-gray rounded-xl m-6 md:m-0": isOpen,
        })}
      >
        <SearchIcon className="min-w-4 min-h-4" />

        <form onSubmit={onSubmit}>
          <input
            ref={inputRef}
            onClick={openSearch}
            type="text"
            name="search"
            className={cn(
              "border-0 pl-1 w-13 ring-0 pr-0 text-sm hover:cursor-pointer",
              {
                "border-r border-light-gray placeholder:text-light-gray w-78 md:w-74 mr-3 pr-3 hover:cursor-text":
                  isOpen,
              }
            )}
            readOnly={!isOpen}
            placeholder="Search"
          />
        </form>

        <CrossIcon
          onClick={closeSearch}
          className={cn(
            "hover:cursor-pointer hover:opacity-80 min-h-5 min-w-5 text-gray",
            {
              hidden: !isOpen,
            }
          )}
        />
      </div>
    </div>
  );
}

export default SearchBar;

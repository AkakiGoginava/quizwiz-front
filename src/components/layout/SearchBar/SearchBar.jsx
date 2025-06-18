import React from "react";

import { cn } from "@/helper";
import { SearchIcon, CrossIcon } from "@/components";
import { useSearchBar } from "./useSearchBar";

function SearchBar() {
  const { isOpen, inputRef, openSearch, closeSearch, onSubmit } =
    useSearchBar();

  return (
    <div
      className={cn("flex border border-transparent items-center px-3", {
        "border-light-gray rounded-xl": isOpen,
      })}
    >
      <SearchIcon />

      <form onSubmit={onSubmit}>
        <input
          ref={inputRef}
          onClick={openSearch}
          type="text"
          name="search"
          className={cn(
            "border-0 pl-1 w-13 ring-0 pr-0 text-sm hover:cursor-pointer",
            {
              "border-r border-light-gray placeholder:text-light-gray w-74 mr-3 pr-3 hover:cursor-text":
                isOpen,
            }
          )}
          readOnly={!isOpen}
          placeholder="Search"
        />
      </form>

      <CrossIcon
        onClick={closeSearch}
        className={cn("hover:cursor-pointer hover:opacity-80", {
          hidden: !isOpen,
        })}
      />
    </div>
  );
}

export default SearchBar;

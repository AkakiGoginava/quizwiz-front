import React, { useRef, useState } from "react";
import { SearchIcon, CrossIcon } from "@/assets";
import { cn } from "@/helper";
import { useNavigate, useSearchParams } from "react-router-dom";

function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = function (e) {
    e.preventDefault();
    navigate(`/quizzes?title=${inputRef.current.value}`);
  };

  return (
    <div
      className={cn("flex border border-transparent items-center px-3", {
        "border-light-gray rounded-xl": isOpen,
      })}
    >
      <SearchIcon />

      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          onClick={() => {
            setIsOpen(true);
            inputRef.current.value = searchParams.get("title");
          }}
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
        onClick={() => {
          setIsOpen(false);
          inputRef.current.value = "";
        }}
        className={cn("hover:cursor-pointer hover:opacity-80", {
          hidden: !isOpen,
        })}
      />
    </div>
  );
}

export default SearchBar;

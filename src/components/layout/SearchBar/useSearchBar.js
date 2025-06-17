import { useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { handleSubmit } from "@/components/layout/helpers";

const useSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const openSearch = () => {
    setIsOpen(true);
    if (inputRef.current) {
      inputRef.current.value = searchParams.get("title") || "";
    }
  };

  const closeSearch = () => {
    setIsOpen(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = (e) => {
    handleSubmit(e, navigate, inputRef);
  };

  return {
    isOpen,
    setIsOpen,
    inputRef,
    openSearch,
    closeSearch,
    onSubmit,
    searchParams,
  };
};

export default useSearchBar;

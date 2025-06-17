import React from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "@/hook";

const useHeader = () => {
  const { logout, user, isLoading } = useAuth();
  const [isModalOpen, setModalOpen] = React.useState(false);
  const location = useLocation();

  return {
    logout,
    user,
    isLoading,
    isModalOpen,
    setModalOpen,
    location,
  };
};

export default useHeader;

import { useState } from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "@/hook";

export const useHeader = () => {
  const { logout, user, isLoading } = useAuth();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const location = useLocation();

  return {
    logout,
    user,
    isLoading,
    isProfileModalOpen,
    setProfileModalOpen,
    isMenuModalOpen,
    setMenuModalOpen,
    location,
  };
};

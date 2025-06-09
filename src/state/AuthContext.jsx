import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { registerUser, loginUser, logoutUser, fetchUser } from "@/services";
import { useAuthMutation } from "@/hook";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: Infinity,
  });

  const handleRegister = useAuthMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/");
    },
  });

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/quizzes");
    },
  });

  const handleLogout = useAuthMutation(logoutUser, {
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], null);
      console.log("Logout successful!", data);

      navigate("/");
    },
    onError: (error) => {
      console.error("Logout failed:", error);
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        isAuthenticated: !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

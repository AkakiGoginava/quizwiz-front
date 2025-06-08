import React, { createContext } from "react";
import PropTypes from "prop-types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { loginUser, logoutUser, fetchUser } from "@/services";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: Infinity,
  });

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    queryClient.setQueryData(["user"], res.data);
  };

  const logout = async () => {
    await logoutUser();
    queryClient.setQueryData(["user"], null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
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

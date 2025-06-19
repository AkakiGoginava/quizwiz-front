import React, { createContext } from "react";
import PropTypes from "prop-types";

import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  registerUser,
  loginUser,
  logoutUser,
  fetchUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "@/services";
import { useAuthMutation } from "@/hook";

export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    retry: false,
    staleTime: Infinity,
  });

  const userQuizzes = user?.data?.quizzes
    ? Object.fromEntries(user.data.quizzes.map((quiz) => [quiz.quiz_id, quiz]))
    : {};

  const handleRegister = useAuthMutation(registerUser, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const handleVerify = useAuthMutation(verifyEmail);

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      const id = searchParams.get("verify_id");
      const hash = searchParams.get("verify_hash");

      if (id && hash) {
        handleVerify({ id, hash }, () => {});
      }

      navigate("/quizzes");
    },
    onError: (error) => {
      console.error("Login failed:", error);
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

  const handleForgotPassword = useAuthMutation(forgotPassword, {
    onSuccess: (data) => {
      console.log("Forgot password request successful!", data);
    },
    onError: (error) => {
      console.error("Forgot password request failed:", error);
    },
  });

  const handleResetPassword = useAuthMutation(resetPassword, {
    onSuccess: (data) => {
      console.log("Password reset successful!", data);

      navigate("/");
    },
    onError: (error) => {
      console.error("Password reset failed:", error);
    },
  });

  const isAuthenticated =
    !isLoading && (!error || error?.response?.status != 401);

  return (
    <AuthContext.Provider
      value={{
        user: user?.data,
        userQuizzes,
        register: handleRegister,
        login: handleLogin,
        logout: handleLogout,
        forgotPassword: handleForgotPassword,
        resetPassword: handleResetPassword,
        isAuthenticated,
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

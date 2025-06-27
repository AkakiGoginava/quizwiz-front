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
import { toast } from "react-toastify";
import { ToastContent } from "@/components";

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
    onSuccess: (success) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });

      navigate("/");

      toast.success(
        <ToastContent
          title="Successful registration"
          message={success.data.message}
        />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Registration failed"
          message={error.response.data.message}
        />
      );
    },
  });

  const handleVerify = useAuthMutation(verifyEmail, {
    onSuccess: (success) => {
      toast.success(
        <ToastContent
          title="Email verified successfully"
          message={success.data.message}
        />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Could not verify email"
          message={error.response.data.message}
        />
      );
    },
  });

  const handleLogin = useAuthMutation(loginUser, {
    onSuccess: async (success) => {
      await queryClient.invalidateQueries({ queryKey: ["user"] });

      const token = searchParams.get("token");

      if (token) {
        handleVerify({ token }, () => {});
      }

      navigate("/quizzes");

      toast.success(
        <ToastContent title="Successful login" message={success.data.message} />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Login failed"
          message={error.response.data.message}
        />
      );
    },
  });

  const handleLogout = useAuthMutation(logoutUser, {
    onSuccess: (success) => {
      queryClient.setQueryData(["user"], null);

      navigate("/");

      toast.success(
        <ToastContent
          title="Successful logout"
          message={success.data.message}
        />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Logout failed"
          message={error.response.data.message}
        />
      );
    },
  });

  const handleForgotPassword = useAuthMutation(forgotPassword, {
    onSuccess: (success) => {
      navigate("/");

      toast.success(
        <ToastContent
          title="Request sent successfully"
          message={success.data.message}
        />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Request failed"
          message={error.response.data.message}
        />
      );
    },
  });

  const handleResetPassword = useAuthMutation(resetPassword, {
    onSuccess: (success) => {
      navigate("/");

      toast.success(
        <ToastContent
          title="Password reset successfully"
          message={success.data.message}
        />
      );
    },
    onError: (error) => {
      toast.error(
        <ToastContent
          title="Could not reset password"
          message={error?.response.data.message}
        />
      );
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
        verifyEmail: handleVerify,
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

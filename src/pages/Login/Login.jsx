import React, { useEffect } from "react";

import { Link, useSearchParams } from "react-router-dom";

import { loginCover } from "@/assets";
import { useAuth } from "@/hook";
import { AuthLayout, AuthForm, ToastContent } from "@/components";
import { checkEmailVerifyToken } from "@/services";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const { login } = useAuth();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const mutation = useMutation({
    mutationFn: checkEmailVerifyToken,
    onError: (error) => {
      toast.warning(
        <ToastContent
          title="Token expired"
          message={error.response.data.message}
        />
      );
    },
  });

  useEffect(() => {
    if (token) {
      mutation.mutate({ token });
    }
  }, [token]);

  const loginFields = [
    {
      name: "email",
      label: "Email adress",
      type: "email",
      placeholder: "Your email",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      },
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Your password",
      rules: {
        required: "Password is required",
      },
    },
    {
      name: "remember",
      label: "Remember me for 30 days",
      type: "checkbox",
    },
  ];

  return (
    <AuthLayout coverImg={loginCover}>
      <AuthForm
        fields={loginFields}
        onSubmit={login}
        submitText="Log in"
        title="Hi, Welcome! 👋"
        hasForgotPassword={true}
        footer={
          <p className="text-sm text-gray-900">
            Dont have an account?{" "}
            <Link
              className="font-semibold text-blue-600 hover:pinter-cursor hover:text-blue-500"
              to="/register"
            >
              Sign up
            </Link>
          </p>
        }
      />
    </AuthLayout>
  );
}

export default Login;

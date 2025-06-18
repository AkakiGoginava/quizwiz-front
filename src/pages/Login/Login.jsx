import React from "react";

import { Link } from "react-router-dom";

import { loginCover } from "@/assets";
import { useAuth } from "@/hook";
import { AuthLayout, AuthForm } from "@/components";

function Login() {
  const { login } = useAuth();

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
      <div className="flex flex-col gap-9.5">
        <AuthForm
          fields={loginFields}
          onSubmit={login}
          submitText="Log in"
          title="Hi, Welcome! 👋"
          hasForgotPassword={true}
        />

        <p className="text-sm text-gray-900">
          Dont have an account?{" "}
          <Link
            className="font-semibold text-blue-600 hover:pinter-cursor hover:text-blue-500"
            to="/register"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Login;

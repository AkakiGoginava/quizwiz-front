import React from "react";

import { forgotCover } from "@/assets";
import { useAuth } from "@/hook";
import { AuthLayout, AuthForm } from "@/components";

function Login() {
  const { forgotPassword } = useAuth();

  const forgotFields = [
    {
      name: "email",
      label: "Email address",
      type: "email",
      placeholder: "enter your email address",
      rules: {
        required: "Email address is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
      },
    },
  ];

  return (
    <AuthLayout coverImg={forgotCover}>
      <AuthForm
        fields={forgotFields}
        onSubmit={forgotPassword}
        submitText="Send"
        title="Forgot password?"
        subTitle="Don't worry! It happens. Please enter the email associated with your account."
      />
    </AuthLayout>
  );
}

export default Login;

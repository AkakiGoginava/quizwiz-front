import React from "react";
import coverImg from "@/assets/images/reset-cover.png";
import { AuthLayout, AuthForm } from "@/components";
import { useAuth } from "@/hook";

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
    <AuthLayout coverImg={coverImg}>
      <div className="flex flex-col gap-9.5">
        <AuthForm
          fields={forgotFields}
          onSubmit={forgotPassword}
          submitText="Send"
          title="Forgot password?"
          subTitle="Don't worry! It happens. Please enter the email associated with your account."
        />
      </div>
    </AuthLayout>
  );
}

export default Login;

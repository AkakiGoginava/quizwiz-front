import React from "react";
import PropTypes from "prop-types";
import coverImg from "@/assets/images/reset-cover.png";
import AuthLayout from "@/components/authLayout/AuthLayout";
import AuthForm from "@/components/forms/AuthForm";
import { useAuth } from "@/hook";

function Login({ navigate }) {
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

  const { forgotPassword } = useAuth();

  return (
    <AuthLayout coverImg={coverImg} navigate={navigate}>
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

Login.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Login;

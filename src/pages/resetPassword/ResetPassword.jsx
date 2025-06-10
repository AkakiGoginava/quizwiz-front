import React from "react";
import PropTypes from "prop-types";
import coverImg from "@/assets/images/reset-cover.png";
import AuthLayout from "@/components/authLayout/AuthLayout";
import AuthForm from "@/components/forms/AuthForm";
import { useAuth } from "@/hook";

function Login({ navigate }) {
  const resetFields = [
    {
      name: "password",
      label: "New password",
      type: "password",
      placeholder: "must be 3 characters long",
      rules: {
        required: "New password is required",
        minLength: {
          value: 3,
          message: "Password must be at least 3 characters long",
        },
      },
    },
    {
      name: "password_confirmation",
      label: "confirm password",
      type: "password",
      placeholder: "repeat password",
      rules: {
        required: "Password confirmation is required",
      },
    },
  ];

  const { resetPassword } = useAuth();

  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  return (
    <AuthLayout coverImg={coverImg} navigate={navigate}>
      <div className="flex flex-col gap-9.5">
        <AuthForm
          fields={resetFields}
          onSubmit={(data) => resetPassword({ ...data, token, email })}
          submitText="Reset password"
          title="Reset password"
          subTitle="Please type something you'll remember"
        />
      </div>
    </AuthLayout>
  );
}

Login.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Login;

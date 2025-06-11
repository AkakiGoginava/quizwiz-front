import React from "react";
import { Link } from "react-router-dom";
import { registerCover } from "@/assets";
import { AuthLayout, AuthForm } from "@/components";
import { useInputValidator, useAuth } from "@/hook";

function Register() {
  const validateInput = useInputValidator();

  const { register } = useAuth();

  const registerFields = [
    {
      name: "name",
      label: "Username",
      type: "text",
      placeholder: "Your username",
      rules: {
        required: "Username is required",
        minLength: {
          value: 3,
          message: "Name must be at least 3 characters long",
        },
        validate: (value) => validateInput("name", value),
      },
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Example@gmail.com",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "Invalid email address",
        },
        validate: (value) => validateInput("email", value),
      },
    },
    {
      name: "password",
      label: "Create a password",
      type: "password",
      placeholder: "must be 3 characters",
      rules: {
        required: "Password is required",
        minLength: {
          value: 3,
          message: "Password must be at least 3 characters long",
        },
      },
    },
    {
      name: "password_confirmation",
      label: "Confirm password",
      type: "password",
      placeholder: "must be 3 characters",
      rules: { required: "Confirm your password" },
    },
    {
      name: "terms",
      label: "I accept the terms and privacy policy",
      type: "checkbox",
      rules: {
        required: "You must accept before submitting",
      },
    },
  ];

  return (
    <AuthLayout coverImg={registerCover}>
      <div className="flex flex-col gap-9.5">
        <AuthForm
          fields={registerFields}
          onSubmit={register}
          submitText="Register"
          title="Create account"
        />

        <p className="text-sm text-gray-900">
          Already have an acount?{" "}
          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:pinter-cursor hover:text-blue-500"
          >
            Log in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

export default Register;

import React from "react";
import coverImg from "@/assets/images/register-cover.png";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AuthForm } from "@/components/forms";
import { useMutation } from "@tanstack/react-query";
import AuthLayout from "@/components/authLayout/AuthLayout";
import registerUser from "@/services/registerUser";

function Register({ navigate }) {
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

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleRegister = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <AuthLayout coverImg={coverImg} navigate={navigate}>
      <div className="flex flex-col gap-9.5">
        <AuthForm
          fields={registerFields}
          onSubmit={handleRegister}
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

Register.propTypes = {
  navigate: PropTypes.func.isRequired,
};

export default Register;

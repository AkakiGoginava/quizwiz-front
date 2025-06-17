import { useRef } from "react";
import { useAuth } from "@/hook";
import { checkUniqueInput } from "@/services";

const useRegister = () => {
  const timeoutRef = useRef(null);
  const fieldNames = {
    email: "Email",
    name: "Username",
  };

  function validateInput(field, value) {
    return new Promise((resolve) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(async () => {
        try {
          const res = await checkUniqueInput(field, value);
          resolve(
            res.data.unique ? true : `${fieldNames[field]} is already taken`
          );
        } catch (error) {
          resolve(`Error validating input: ${error}`);
        }
      }, 500);
    });
  }

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

  return { registerFields, register };
};

export default useRegister;

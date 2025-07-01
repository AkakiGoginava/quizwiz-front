import { useAuth } from "@/hook";

export const useRegister = () => {
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

  return { registerFields, register };
};

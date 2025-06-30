import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { resetCover } from "@/assets";
import { useAuth } from "@/hook";
import { AuthLayout, AuthForm, ToastContent } from "@/components";
import { checkPasswordToken } from "@/services";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

function ResetPassword() {
  const { resetPassword } = useAuth();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const mutation = useMutation({
    mutationFn: ({ token, email }) => checkPasswordToken(token, email),
    onError: (error) => {
      toast.warning(
        <ToastContent
          title="Invalid token"
          message={error.response.data.message}
        />
      );
    },
  });

  useEffect(() => {
    if (token && email) {
      mutation.mutate({ token, email });
    }
  }, [token, email]);

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

  return (
    <AuthLayout coverImg={resetCover}>
      <AuthForm
        fields={resetFields}
        onSubmit={(data, setError) =>
          resetPassword({ ...data, token, email }, setError)
        }
        submitText="Reset password"
        title="Reset password"
        subTitle="Please type something you'll remember"
      />
    </AuthLayout>
  );
}

export default ResetPassword;

import React from "react";
import { useSearchParams } from "react-router-dom";
import coverImg from "@/assets/images/reset-cover.png";
import { AuthLayout, AuthForm } from "@/components";
import { useAuth } from "@/hook";

function ResetPassword() {
  const { resetPassword } = useAuth();

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

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
    <AuthLayout coverImg={coverImg}>
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

export default ResetPassword;

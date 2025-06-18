import React from "react";

import { Link } from "react-router-dom";

import { registerCover } from "@/assets";
import { AuthLayout, AuthForm } from "@/components";
import { useRegister } from "./useRegister";

function Register() {
  const { registerFields, register } = useRegister();

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

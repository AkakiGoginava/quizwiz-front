import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { InputField, CheckboxField } from "./";
import { Link } from "react-router-dom";

function AuthForm({
  fields,
  onSubmit,
  submitText = "Submit",
  title = "",
  subTitle = "",
  hasForgotPassword = false,
  children,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, setError))}
      className="flex flex-col gap-10 w-106.5"
      noValidate
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold">{title}</h1>
        <h3 className="text-sm text-[#475467]">{subTitle}</h3>
      </div>

      <div className="flex flex-col gap-6">
        {fields.map((field) =>
          field.type === "checkbox" ? (
            <div key={field.name} className="flex">
              <CheckboxField
                name={field.name}
                label={field.label}
                rules={field.rules}
                register={register}
                error={errors[field.name]}
              />

              {hasForgotPassword && (
                <Link
                  to="/forgot-password"
                  className="ml-auto text-sm text-[#344054]"
                >
                  Forgot password?
                </Link>
              )}
            </div>
          ) : (
            <InputField
              key={field.name}
              name={field.name}
              label={field.label}
              type={field.type}
              rules={field.rules}
              placeholder={field.placeholder}
              register={register}
              error={errors[field.name]}
            />
          )
        )}

        {children &&
          React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { register })
              : child
          )}
      </div>

      <button
        type="submit"
        className="text-white bg-black rounded-[0.625rem] py-4 font-semibold transition hover:cursor-pointer hover:opacity-85 disabled:opacity-70 disabled:cursor-progress"
        disabled={isSubmitting}
      >
        {submitText}
      </button>
    </form>
  );
}

AuthForm.propTypes = {
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      label: PropTypes.string,
      type: PropTypes.string,
      rules: PropTypes.object,
      placeholder: PropTypes.string,
    })
  ).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.string,
  title: PropTypes.string,
  subTitle: PropTypes.string,
  hasForgotPassword: PropTypes.bool,
  children: PropTypes.node,
};

export default AuthForm;

import React from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { InputField, CheckboxField } from "./";

function AuthForm({ fields, onSubmit, submitText = "Submit", title = "" }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 w-106.5"
      noValidate
    >
      <h1 className="text-3xl font-extrabold">{title}</h1>

      <div className="flex flex-col gap-6">
        {fields.map((field) =>
          field.type === "checkbox" ? (
            <CheckboxField
              key={field.name}
              name={field.name}
              label={field.label}
              rules={field.rules}
              register={register}
              error={errors[field.name]}
            />
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
      </div>

      <button
        type="submit"
        className="text-white bg-black rounded-[0.625rem] py-4 font-semibold transition hover:cursor-pointer hover:opacity-85"
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
};

export default AuthForm;

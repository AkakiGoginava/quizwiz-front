import { useRef } from "react";
import { checkUniqueInput } from "@/services";

function useInputValidator() {
  const timeoutRef = useRef(null);
  const fieldNames = {
    email: "Email",
    name: "Username",
  };

  function validate(field, value) {
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

  return validate;
}

export default useInputValidator;

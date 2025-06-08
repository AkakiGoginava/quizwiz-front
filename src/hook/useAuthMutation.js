import { useMutation } from "@tanstack/react-query";

function useAuthMutation(mutationFn, options = {}) {
  const mutation = useMutation({
    mutationFn,
    ...options,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (formData, setError) => {
    mutation.mutate(formData, {
      onSuccess: (data) => {
        if (options.onSuccess) options.onSuccess(data);
      },
      onError: (error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          const errors = error.response.data.errors;
          Object.entries(errors).forEach(([field, messages]) => {
            setError(field, { type: "server", message: messages[0] });
          });
        }

        if (options.onError) options.onError(error);
      },
    });
  };
}

export default useAuthMutation;

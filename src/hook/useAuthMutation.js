import { useMutation } from "@tanstack/react-query";

function useAuthMutation(mutationFn, options = {}) {
  const mutation = useMutation({
    mutationFn,
    ...options,
  });

  return (formData, setError) => {
    mutation.mutate(formData, {
      onError: (error) => {
        const errors = error?.response?.data?.errors ?? {};

        if (setError && Object.keys(errors).length > 0) {
          Object.entries(errors).forEach(([field, messages]) => {
            setError(field, { type: "server", message: messages[0] });
          });
        }
      },
    });
  };
}

export default useAuthMutation;

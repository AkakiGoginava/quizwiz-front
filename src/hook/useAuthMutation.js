import { useMutation } from "@tanstack/react-query";

function useAuthMutation(mutationFn, options = {}) {
  const mutation = useMutation({
    mutationFn,
    ...options,
    onSuccess: (data) => console.log(data),
    onError: (error) => console.log(error),
  });

  return (formData, setError) => {
    mutation.mutate(formData, {
      onSuccess: (data) => options?.onSuccess(data),
      onError: (error) => {
        const errors = error?.response?.data?.errors ?? {};

        Object.entries(errors).forEach(([field, messages]) => {
          setError(field, { type: "server", message: messages[0] });
        });

        options?.onError(error);
      },
    });
  };
}

export default useAuthMutation;

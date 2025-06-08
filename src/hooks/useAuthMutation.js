import { useMutation } from "@tanstack/react-query";

function useAuthMutation(mutationFn) {
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (formData, setError) => {
    mutation.mutate(formData, {
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
      },
    });
  };
}

export default useAuthMutation;

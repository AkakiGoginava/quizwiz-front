import { fetchQuiz, startQuiz } from "@/services";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

function useStartQuiz(setAttemptId) {
  return useMutation({
    mutationFn: (i) => startQuiz(i),
    onSuccess: (response) => {
      setAttemptId(response.attempt_id);
    },
  });
}

export const useQuizSubmitPage = () => {
  const { id: openQuizId } = useParams();
  const { control, handleSubmit } = useForm();

  const [timeLeft, setTimeLeft] = useState(null);
  const [attemptId, setAttemptId] = useState(null);

  const {
    mutate: startQuizMutate,
    isPending,
    isSuccess,
  } = useStartQuiz(setAttemptId);

  const { data, isLoading } = useQuery({
    queryKey: ["quiz", openQuizId],
    queryFn: () => fetchQuiz(openQuizId),
    enabled: !!openQuizId,
  });

  const openQuiz = data?.data;
  const questions = openQuiz?.questions;

  useEffect(() => {
    if (openQuizId) {
      startQuizMutate(openQuizId);
    }
  }, [openQuizId]);

  useEffect(() => {
    if (!openQuiz?.max_time) return;

    const [h, m, s] = openQuiz.max_time.split(":").map(Number);
    const totalSeconds = h * 3600 + m * 60 + s;
    setTimeLeft(totalSeconds);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openQuiz?.max_time]);

  return {
    control,
    handleSubmit,
    timeLeft,
    isLoading,
    openQuiz,
    questions,
    isPending,
    isSuccess,
  };
};

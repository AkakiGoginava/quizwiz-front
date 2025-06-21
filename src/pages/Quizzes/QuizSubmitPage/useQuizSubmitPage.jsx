import { endQuiz, fetchQuiz, startQuiz } from "@/services";
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

function useEndQuiz(setResultTime, setResultPoints) {
  return useMutation({
    mutationFn: ({ quizId, attemptId, answers }) =>
      endQuiz(quizId, attemptId, answers),
    onSuccess: (response) => {
      setResultTime(response.result_time);
      setResultPoints(response.result_points);
    },
  });
}

export const useQuizSubmitPage = () => {
  const { id: openQuizId } = useParams();
  const { control, handleSubmit, getValues } = useForm();

  const [timeLeft, setTimeLeft] = useState(null);
  const [attemptId, setAttemptId] = useState(null);
  const [resultTime, setResultTime] = useState(null);
  const [resultPoints, setResultPoints] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const {
    mutate: startQuizMutate,
    isPendng: isPendingStart,
    isSuccess: isSuccessStart,
  } = useStartQuiz(setAttemptId);

  const {
    mutate: endQuizMutate,
    isPending: isPendingEnd,
    isSuccess: isSuccessEnd,
  } = useEndQuiz(setResultTime, setResultPoints);

  const { data, isLoading: isLoadingQuiz } = useQuery({
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

          const answers = getValues("answers");

          setResultModalOpen(true);
          endQuizMutate({ quizId: openQuizId, attemptId, answers });
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [openQuiz?.max_time, attemptId]);

  return {
    control,
    openQuizId,
    handleSubmit,
    timeLeft,
    isLoadingQuiz,
    openQuiz,
    questions,
    isPendingStart,
    isSuccessStart,
    attemptId,
    endQuizMutate,
    isPendingEnd,
    isSuccessEnd,
    resultPoints,
    resultTime,
    resultModalOpen,
    setResultModalOpen,
  };
};

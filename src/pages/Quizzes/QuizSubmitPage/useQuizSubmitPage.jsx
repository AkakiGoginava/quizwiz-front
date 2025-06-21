import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { fetchQuiz } from "@/services";

import { useEndQuiz, useQuizTimer, useStartQuiz } from "./hooks";

export const useQuizSubmitPage = () => {
  const { id: openQuizId } = useParams();
  const { control, handleSubmit, getValues } = useForm();

  const [attemptId, setAttemptId] = useState(null);
  const [resultTime, setResultTime] = useState(null);
  const [resultPoints, setResultPoints] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const {
    mutate: startQuizMutate,
    isPending: isPendingStart,
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

  const [timeLeft, clearQuizTimer] = useQuizTimer(
    openQuiz?.max_time,
    attemptId,
    openQuizId,
    getValues,
    endQuizMutate,
    setResultModalOpen
  );

  return {
    control,
    openQuizId,
    handleSubmit,
    timeLeft,
    clearQuizTimer,
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

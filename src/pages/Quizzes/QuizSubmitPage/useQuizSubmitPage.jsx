import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { fetchQuiz } from "@/services";

import { useEndQuiz, useQuizTimer, useStartQuiz } from "./hooks";

export const useQuizSubmitPage = () => {
  const { id: openQuizId } = useParams();
  const { control, handleSubmit, getValues, watch } = useForm();
  const queryClient = useQueryClient();

  const [attemptId, setAttemptId] = useState(null);
  const [resultTime, setResultTime] = useState(null);
  const [resultPoints, setResultPoints] = useState(null);
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const {
    mutate: startQuizMutate,
    isPending: isPendingStart,
    isSuccess: isSuccessStart,
  } = useStartQuiz(setAttemptId);

  const { mutate: endQuizMutate, isPending: isPendingEnd } = useEndQuiz(
    setResultTime,
    setResultPoints
  );

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
    return () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    };
  }, [queryClient]);

  const [timeLeft, clearQuizTimer] = useQuizTimer(
    openQuiz?.max_time,
    attemptId,
    openQuizId,
    getValues,
    endQuizMutate,
    setResultModalOpen
  );

  const onSubmit = (answers) => {
    clearQuizTimer();

    setResultModalOpen(true);

    return endQuizMutate({ quizId: openQuizId, attemptId, answers });
  };

  const watchedAnswers = watch("answers") || {};
  const markedCount = Object.values(watchedAnswers).filter(
    (answer) => answer !== undefined && answer.length > 0
  ).length;

  return {
    control,
    handleSubmit,
    onSubmit,
    timeLeft,
    isLoadingQuiz,
    openQuiz,
    questions,
    isPendingStart,
    isSuccessStart,
    isPendingEnd,
    resultPoints,
    resultTime,
    resultModalOpen,
    setResultModalOpen,
    markedCount,
  };
};

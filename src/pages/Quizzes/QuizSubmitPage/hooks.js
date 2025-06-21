import { useEffect, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { endQuiz, startQuiz } from "@/services";

export const useStartQuiz = (setAttemptId) => {
  return useMutation({
    mutationFn: (i) => startQuiz(i),
    onSuccess: (response) => {
      setAttemptId(response.attempt_id);
    },
  });
};

export const useEndQuiz = (setResultTime, setResultPoints) => {
  return useMutation({
    mutationFn: ({ quizId, attemptId, answers }) =>
      endQuiz(quizId, attemptId, answers),
    onSuccess: (response) => {
      setResultTime(response.result_time);
      setResultPoints(response.result_points);
    },
  });
};

export const useQuizTimer = (
  maxTime,
  attemptId,
  openQuizId,
  getValues,
  endQuizMutate,
  setResultModalOpen
) => {
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!maxTime) return;

    const [h, m, s] = maxTime.split(":").map(Number);
    const totalSeconds = h * 3600 + m * 60 + s;
    setTimeLeft(totalSeconds);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          const answers = getValues("answers");
          setResultModalOpen(true);
          endQuizMutate({ quizId: openQuizId, attemptId, answers });
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [maxTime, attemptId]);

  return [timeLeft, () => clearInterval(timerRef.current)];
};

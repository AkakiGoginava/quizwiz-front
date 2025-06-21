import { useAuth } from "@/hook";
import React from "react";

import { Navigate, Outlet, useParams } from "react-router-dom";

function QuizGuard() {
  const { id } = useParams();
  const { userQuizzes, isLoading } = useAuth();

  if (isLoading) return <></>;

  if (userQuizzes[id]) {
    return <Navigate to={`/quizzes/${id}`} />;
  }

  return <Outlet />;
}
export default QuizGuard;

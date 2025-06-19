import { CrossIcon, SpinningWheelIcon } from "@/components";
import { fetchQuiz } from "@/services";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";

function QuizSubmitPage() {
  const { id: openQuizId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["quiz", openQuizId],
    queryFn: () => fetchQuiz(openQuizId),
    enabled: !!openQuizId,
  });

  const openQuiz = data?.data;

  return (
    <div className="size-full">
      <header className="flex px-24 py-6 w-full border-b border-gray-200">
        <CrossIcon className="ml-auto size-6 text-gray-800 transition hover:cursor-pointer hover:opacity-80" />
      </header>

      <section className="flex flex-col py-15 px-25">
        <div className="flex flex-col gap-6">
          <h1 className="text-center font-bold text-4.5xl">
            {openQuiz?.title}
          </h1>
        </div>
      </section>

      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs">
          <SpinningWheelIcon
            className="size-37 animate-spin"
            strokeWidth={0.5}
          />
        </div>
      )}
    </div>
  );
}

export default QuizSubmitPage;

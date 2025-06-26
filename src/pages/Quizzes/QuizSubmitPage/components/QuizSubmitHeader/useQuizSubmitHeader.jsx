import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const useQuizSubmitHeader = (quiz) => {
  const navigate = useNavigate();

  const [showQuizInfo, setShowQuizInfo] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setShowQuizInfo(window.scrollY > 180);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  });

  const categoryNames = quiz?.categories.map((cat) => cat.name).join(", ");

  return { showQuizInfo, categoryNames, navigate };
};

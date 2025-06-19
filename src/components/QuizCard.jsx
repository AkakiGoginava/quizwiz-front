import React from "react";
import PropTypes from "prop-types";

import { CompletedIcon, NotCompletedIcon, PointsIcon } from "@/components";
import { formatTime } from "@/helper";
import { useNavigate } from "react-router-dom";

function QuizCard({
  id,
  completeDate = null,
  time = null,
  points = null,
  totalPoints,
  title,
  totalUsers,
  difficulty,
  categories,
  image,
}) {
  const navigate = useNavigate();
  const date = new Date(completeDate);

  return (
    <div
      onClick={() => navigate(`/quizzes/${id}`)}
      className="flex flex-col w-98.5 gap-8 px-6 pt-6 pb-8 rounded-2xl shadow-lg transition hover:bg-gray-200 hover:cursor-pointer hover:shadow-2xl"
    >
      <img src={image} className="h-60 w-86" alt="quiz image" />

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3">
          <div className="w-full overflow-ellipsis">
            {categories?.map((category, i) => (
              <React.Fragment key={i}>
                <span className="font-semibold text-blue text-sm">
                  {category.name}
                </span>

                {i < categories.length - 1 && (
                  <span className="mx-1.5 text-gray-300 text-sm">•</span>
                )}
              </React.Fragment>
            ))}
          </div>

          <h2 className="font-semibold text-2xl w-full whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-5 text-sm">
          <div className="flex gap-5.5">
            <div className="flex gap-3">
              {completeDate ? (
                <CompletedIcon className="w-10 h-10" />
              ) : (
                <NotCompletedIcon className="w-10 h-10" />
              )}

              <div className="">
                <p className="font-semibold">
                  {completeDate ? "Completed" : "Not Completed"}
                </p>

                <p
                  className={completeDate ? "text-gray-600" : "text-light-gray"}
                >
                  {completeDate
                    ? date.toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "Date,Time"}
                </p>
              </div>
            </div>

            <div>
              <p className="font-semibold">Total time</p>

              <p className={time ? "text-gray-600" : "text-light-gray"}>
                {time ? formatTime(time) : "N/A"}
              </p>
            </div>

            <div>
              <p className="font-semibold ">Total users</p>
              <p className="text-gray-600">{totalUsers}</p>
            </div>
          </div>

          <div className="flex gap-5">
            <div className="flex gap-3">
              <img src={difficulty.icon} className="w-10 h-10" />

              <div>
                <p className="font-semibold">Difficulty level</p>
                <p className="text-gray-600">{difficulty.name}</p>
              </div>
            </div>

            {completeDate && (
              <div className="flex gap-3">
                <PointsIcon className="w-10 h-10" />

                <div>
                  <p className="font-semibold">Points</p>

                  <div className="text-gray-600">
                    <span>{points}</span>
                    <span>/</span>
                    <span>{totalPoints}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

QuizCard.propTypes = {
  completeDate: PropTypes.string,
  time: PropTypes.string,
  id: PropTypes.number,
  points: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  totalPoints: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  title: PropTypes.string.isRequired,
  totalUsers: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  difficulty: PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  image: PropTypes.string.isRequired,
};

export default QuizCard;

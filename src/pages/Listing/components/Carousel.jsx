import React from "react";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import { CategoryBtn } from "./";
import { DarkArrowIcon } from "@/assets";
import { cn } from "@/helper";

function Carousel({ categories }) {
  const containerRef = useRef(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const handleScroll = (e) => {
    const container = containerRef.current;
    const scrollArrow = e.target;
    const direction = scrollArrow.dataset.direction;

    if (container) {
      container.scrollBy({
        left:
          direction === "right"
            ? container.offsetWidth
            : -container.offsetWidth,
        behavior: "smooth",
      });
    }

    setTimeout(() => {
      setAtStart(container.scrollLeft <= 1);
      setAtEnd(
        container.scrollLeft + container.offsetWidth >=
          container.scrollWidth - 1
      );
    }, 550);
  };

  return (
    <div className="flex gap-3 w-full overflow-hidden">
      <div className="mt-2.5 size-5">
        <DarkArrowIcon
          onClick={handleScroll}
          data-direction="left"
          className={cn(
            "transform -scale-x-100 transition hover:opacity-50 hover:cursor-pointer",
            {
              "opacity-0 pointer-events-none": atStart,
            }
          )}
        />
      </div>
      <div ref={containerRef} className="flex gap-4 overflow-hidden">
        <CategoryBtn isActive={true}>All Quizzes</CategoryBtn>

        {categories?.map((category) => (
          <CategoryBtn key={category.id}>{category.name}</CategoryBtn>
        ))}
      </div>

      <div className="mt-2.5 size-5">
        <DarkArrowIcon
          onClick={handleScroll}
          data-direction="right"
          className={cn(" transition hover:opacity-50 hover:cursor-pointer", {
            "opacity-0 pointer-events-none": atEnd,
          })}
        />
      </div>
    </div>
  );
}
Carousel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

export default Carousel;

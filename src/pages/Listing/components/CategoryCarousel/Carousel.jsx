import React from "react";
import PropTypes from "prop-types";
import { DarkArrowIcon } from "@/assets";
import { useState } from "react";
import { cn } from "@/helper";

function Carousel({ children, containerRef }) {
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

      {children}

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
  children: PropTypes.node,
  containerRef: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default Carousel;

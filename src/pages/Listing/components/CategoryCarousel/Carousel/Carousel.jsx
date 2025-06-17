import React from "react";
import PropTypes from "prop-types";

import { ArrowIcon } from "@/components";
import { cn } from "@/helper";
import { useCarousel } from "@/pages/Listing";

function Carousel({ children, containerRef }) {
  const { atStart, atEnd, handleScroll } = useCarousel(containerRef);

  return (
    <div className="flex gap-3 w-full overflow-hidden">
      <div className="mt-2.5">
        <ArrowIcon
          onClick={handleScroll}
          data-direction="left"
          className={cn(
            " transition hover:opacity-50 hover:cursor-pointer size-5",
            {
              "opacity-0 pointer-events-none": atStart,
            }
          )}
        />
      </div>

      {children}

      <div className="mt-2.5">
        <ArrowIcon
          onClick={handleScroll}
          data-direction="right"
          className={cn(
            "transform -scale-x-100 transition hover:opacity-50 hover:cursor-pointer size-5",
            {
              "opacity-0 pointer-events-none": atEnd,
            }
          )}
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

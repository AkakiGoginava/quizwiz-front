import { useState } from "react";

export const useCarousel = (containerRef) => {
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

  return { atStart, atEnd, handleScroll };
};

import React, { useRef } from "react";
import PropTypes from "prop-types";

import { CategoryButton, Carousel } from "@/pages/Listing";

function CategoryCarousel({ categories, categoryFilter, setFilterState }) {
  const containerRef = useRef(null);

  const handleCategoryClick = (categoryId) => {
    setFilterState((prev) => ({
      ...prev,
      categoryFilter: prev.categoryFilter.includes(categoryId)
        ? prev.categoryFilter.filter((id) => id !== categoryId)
        : [...prev.categoryFilter, categoryId],
    }));
  };

  return (
    <Carousel containerRef={containerRef}>
      <div ref={containerRef} className="flex gap-4 overflow-hidden">
        <CategoryButton
          isActive={categoryFilter.length === 0}
          onClick={() =>
            setFilterState((prev) => ({
              ...prev,
              categoryFilter: [],
            }))
          }
        >
          All Quizzes
        </CategoryButton>

        {categories?.map((category) => (
          <CategoryButton
            key={category.id}
            onClick={() => handleCategoryClick(String(category.id))}
            isActive={categoryFilter.includes(String(category.id))}
          >
            {category.name}
          </CategoryButton>
        ))}
      </div>
    </Carousel>
  );
}

CategoryCarousel.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
  categoryFilter: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ).isRequired,
  setFilterState: PropTypes.func.isRequired,
};

export default CategoryCarousel;

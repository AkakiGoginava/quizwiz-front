import React, { useRef } from "react";
import PropTypes from "prop-types";
import { CategoryBtn, Carousel } from ".";

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
        <CategoryBtn
          isActive={categoryFilter.length === 0}
          onClick={() =>
            setFilterState((prev) => ({
              ...prev,
              categoryFilter: [],
            }))
          }
        >
          All Quizzes
        </CategoryBtn>

        {categories?.map((category) => (
          <CategoryBtn
            key={category.id}
            onClick={() => handleCategoryClick(String(category.id))}
            isActive={categoryFilter.includes(String(category.id))}
          >
            {category.name}
          </CategoryBtn>
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

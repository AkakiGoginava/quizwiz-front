import React from "react";
import PropTypes from "prop-types";

import { FilterIcon } from "@/components";
import { CategoryCarousel, FilterModal, useFilterTab } from "@/pages/Listing";

function FilterTab({ filterState, setFilterState }) {
  const { categories, isLoadingCategories, isModalOpen, setIsModalOpen } =
    useFilterTab(filterState, setFilterState);

  if (isLoadingCategories) return <div className="w-full text-center">...</div>;

  return (
    <div className="flex gap-6 mt-6 w-full justify-between">
      <CategoryCarousel
        categories={categories}
        categoryFilter={filterState.categoryFilter}
        setFilterState={setFilterState}
      />

      <div>
        <button
          type="button"
          className="flex gap-1.5 items-center mb-4 py-2 px-4 border border-gray-400 rounded-xl text-gray-500 font-light text-sm transition hover:cursor-pointer hover:opacity-85"
          onClick={() => setIsModalOpen(true)}
        >
          <FilterIcon className="size-3.5" />
          <span>Filter</span>
        </button>

        <FilterModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          categories={categories}
          filterState={filterState}
        />
      </div>
    </div>
  );
}

FilterTab.propTypes = {
  filterState: PropTypes.shape({
    titleSearch: PropTypes.string.isRequired,
    completedFilter: PropTypes.string.isRequired,
    sortType: PropTypes.string.isRequired,
    categoryFilter: PropTypes.array.isRequired,
    difficultyFilter: PropTypes.array.isRequired,
  }).isRequired,
  setFilterState: PropTypes.func.isRequired,
};

export default FilterTab;

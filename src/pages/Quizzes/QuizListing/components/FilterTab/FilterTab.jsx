import React from "react";
import PropTypes from "prop-types";

import { FilterIcon } from "@/components";
import { FilterModal, CategoryCarousel } from ".";
import { useFilterTab } from "./useFilterTab";
import { cn } from "@/helper";

function FilterTab({ filterState, setFilterState }) {
  const {
    categories,
    isLoadingCategories,
    isModalOpen,
    setIsModalOpen,
    activeFilterCount,
  } = useFilterTab(filterState, setFilterState);

  if (isLoadingCategories) return <div className="w-full text-center">...</div>;

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-6 w-full justify-between">
      <CategoryCarousel
        categories={categories}
        categoryFilter={filterState.categoryFilter}
        setFilterState={setFilterState}
      />

      <div>
        <button
          type="button"
          className={cn(
            "relative flex gap-1.5 items-center mb-4 py-3 md:py-2 px-4 border border-gray-400 rounded-xl text-gray-500 font-light text-sm transition hover:cursor-pointer hover:opacity-85 hover:text-blue hover:border-blue",
            {
              "ring-1 ring-black text-black border-black font-normal":
                activeFilterCount,
            }
          )}
          onClick={() => setIsModalOpen(true)}
        >
          <div
            className={cn(
              "absolute top-0 right-0 translate-x-2 -translate-y-2.5 pt-0.5 font-bold text-xs text-white text-center border-2 border-white transition-all rounded-full bg-black size-6 hidden",
              {
                block: activeFilterCount,
              }
            )}
          >
            {activeFilterCount}
          </div>

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

import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { FilterIcon } from "@/assets";
import { useSearchParams } from "react-router-dom";
import { useCategories, useDifficulties } from "@/hook";
import { CategoryCarousel, FilterModal } from ".";

function FilterTab({ filterState, setFilterState }) {
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categories = searchParams.get("categories");
    const title = searchParams.get("title");

    setFilterState((prev) => ({
      ...prev,
      categoryFilter: categories ? categories.split(",") : [],
      titleSearch: title || "",
    }));
  }, [searchParams]);

  useEffect(() => {
    if (filterState.categoryFilter.length > 0) {
      searchParams.set("categories", filterState.categoryFilter.join(","));
    } else {
      searchParams.delete("categories");
    }

    if (filterState.titleSearch) {
      searchParams.set("title", filterState.titleSearch);
    } else {
      searchParams.delete("title");
    }
    setSearchParams(searchParams, { replace: true });
  }, [filterState]);

  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  const { data: difficulties, isLoading: isLoadingDifficulties } =
    useDifficulties();

  if (isLoadingCategories || isLoadingDifficulties)
    return <div className="w-full text-center">...</div>;

  return (
    <div className="flex gap-6 mt-6 w-full justify-between">
      <CategoryCarousel
        categories={categories}
        categoryFilter={filterState.categoryFilter}
        setFilterState={setFilterState}
      />

      <div className="relative">
        <button
          type="button"
          className="flex gap-1.5 items-center mb-4 py-2 px-4 border border-gray-400 rounded-xl text-gray-500 font-light text-sm"
        >
          <FilterIcon className="size-3.5" />
          <span>Filter</span>
        </button>

        <FilterModal
          isOpen={true}
          categories={categories}
          difficulties={difficulties}
          filterState={filterState}
          setFilterState={setFilterState}
        />
      </div>
    </div>
  );
}

FilterTab.propTypes = {
  filterState: PropTypes.shape({
    categoryFilter: PropTypes.array.isRequired,
    titleSearch: PropTypes.string.isRequired,
  }).isRequired,
  setFilterState: PropTypes.func.isRequired,
};

export default FilterTab;

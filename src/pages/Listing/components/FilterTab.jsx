import React from "react";
import { useCategories } from "@/hook";
import { FilterIcon } from "@/assets";
import { CategoryCarousel } from ".";

function FilterTab() {
  const { data: categories, isLoadingCategories } = useCategories();

  if (isLoadingCategories) return <div className="w-full text-center">...</div>;

  return (
    <>
      <div className="flex gap-6 mt-6 w-full justify-between">
        <CategoryCarousel categories={categories} />

        <button
          type="button"
          className="flex gap-1.5 items-center mb-4 py-2 px-4 border border-gray-400 rounded-xl text-gray-500 font-light text-sm"
        >
          <FilterIcon className="size-3.5" />
          <span>Filter</span>
        </button>
      </div>
    </>
  );
}

export default FilterTab;

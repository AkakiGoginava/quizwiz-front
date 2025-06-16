import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CrossIcon,
  FilterIcon,
  SearchIcon,
  ArrowDiagonalIcon,
  ArrowLongIcon,
  DiamondIcon,
} from "@/assets";
import { ToggleRadioGroup, handleRadio, MultipleChoiceGroup } from ".";

function FilterModal({ isOpen, categories, difficulties, filterState }) {
  const [completedRadio, setCompletedRadio] = useState(
    filterState.completedFilter
  );
  const [sortRadio, setSortRadio] = useState(filterState.sortType);

  const [selectedDifficulties, setSelectedDifficulties] = useState([
    ...filterState.difficultyFilter,
  ]);

  const [selectedCategories, setSelectedCategories] = useState([
    ...filterState.categoryFilter,
  ]);

  const completedOptions = [
    { label: "My quizzes", value: "completed" },
    { label: "Not completed", value: "notCompleted" },
  ];

  const sortOptions = [
    { label: "A - Z", icon: <ArrowLongIcon />, value: "name" },
    {
      label: "Z - A",
      icon: <ArrowLongIcon className="rotate-180" />,
      value: "-name",
    },
    { label: "Most popular", icon: <DiamondIcon />, value: "total_users" },
    { label: "Newest", icon: <ArrowDiagonalIcon />, value: "created_at" },
    {
      label: "Oldest",
      icon: <ArrowDiagonalIcon className="rotate-180" />,
      value: "-created_at",
    },
  ];

  if (!isOpen) return null;

  const handleReset = () => {
    setCompletedRadio("");
    setSortRadio("");
    setSelectedDifficulties([]);
    setSelectedCategories([]);
  };

  return (
    <form className="absolute top-12 right-0 flex flex-col gap-4 border rounded-xl p-4 text-sm bg-white z-20">
      <header className="flex gap-4 px-4 items-center">
        <div className="flex gap-2 items-center bg-black text-white rounded-xl py-2 px-3">
          <FilterIcon color="white" />
          <span>Filter</span>
        </div>

        <div className="flex gap-2 items-center px-6 py-1.5 border rounded-3xl border-light-gray">
          <SearchIcon />
          <input
            type="text"
            name="search"
            className="border-0 ring-0 p-0 text-sm w-136"
            placeholder="Search"
          />
        </div>

        <button
          type="submit"
          className="px-7 py-2 text-white font-semibold bg-blue rounded-xl transition hover:cursor-pointer hover:opacity-85"
        >
          Confirm
        </button>

        <span className="text-gray-500 text-xs">|</span>

        <button
          type="button"
          className="flex gap-2 items-center text-gray-500 transition hover:cursor-pointer hover:opacity-85"
          onClick={handleReset}
        >
          <span className="text-nowrap">Reset all filters</span>
          <CrossIcon />
        </button>
      </header>

      <main className="flex gap-2.5 w-full">
        <section className="flex flex-col gap-4 p-4 w-158 max-h-175 overflow-y-scroll border border-light-gray rounded-xl">
          <h6 className="font-semibold text-blue">Filter by</h6>

          <section className="flex flex-col gap-4">
            <ToggleRadioGroup
              type="filter"
              options={completedOptions}
              value={completedRadio}
              onChange={(value) => handleRadio(value, setCompletedRadio)}
            />

            <div className="w-full border-b border-gray-200" />
          </section>

          <section className="flex flex-col gap-4">
            <h6 className="font-semibold">Levels</h6>

            <MultipleChoiceGroup
              choices={difficulties}
              selectedChoices={selectedDifficulties}
              setSelectedChoices={setSelectedDifficulties}
              name="difficulties"
            />

            <div className="w-full border-b border-gray-200" />
          </section>

          <section className="flex flex-col gap-4">
            <h6 className="font-semibold">Categories</h6>

            <MultipleChoiceGroup
              choices={categories}
              selectedChoices={selectedCategories}
              setSelectedChoices={setSelectedCategories}
              name="categories"
            />
          </section>
        </section>

        <section className="flex flex-col gap-6 flex-1 p-4 border border-light-gray rounded-xl">
          <h6 className="font-bold text-blue">Sort by</h6>

          <div className="px-3">
            <ToggleRadioGroup
              type="sort"
              options={sortOptions}
              value={sortRadio}
              onChange={(value) => handleRadio(value, setSortRadio)}
            />
          </div>
        </section>
      </main>
    </form>
  );
}

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ])
  ).isRequired,
  difficulties: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ])
  ).isRequired,
  filterState: PropTypes.shape({
    completedFilter: PropTypes.string,
    sortType: PropTypes.string,
    difficultyFilter: PropTypes.arrayOf(PropTypes.string),
    categoryFilter: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default FilterModal;

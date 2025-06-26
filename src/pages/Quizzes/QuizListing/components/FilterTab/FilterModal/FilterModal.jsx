import React from "react";
import PropTypes from "prop-types";

import { Controller } from "react-hook-form";

import {
  CrossIcon,
  FilterIcon,
  SearchIcon,
  ArrowDiagonalIcon,
  ArrowLongIcon,
  DiamondIcon,
} from "@/components";

import ToggleRadioGroup from "./ToggleRadioGroup";
import MultipleChoiceGroup from "./MultipleChoiceGroup";
import { onSubmit } from "./helpers";
import { useFilterModal } from "./useFilterModal";
import { cn } from "@/helper";

function FilterModal({ isOpen, setIsOpen, categories, filterState }) {
  const {
    control,
    handleSubmit,
    user,
    navigate,
    difficulties,
    isLoadingDifficulties,
    handleReset,
    isChanged,
    isEmpty,
    filterSearch,
    setFilterSearch,
    activeTab,
    setActiveTab,
  } = useFilterModal(filterState);

  if (!isOpen) return null;
  if (isLoadingDifficulties) return <div>...</div>;

  const completedFilterOptions = [
    { label: "My quizzes", value: "true" },
    { label: "Not completed", value: "false" },
  ];

  const sortOptions = [
    { label: "A - Z", icon: <ArrowLongIcon />, value: "title" },
    {
      label: "Z - A",
      icon: <ArrowLongIcon className="rotate-180" />,
      value: "-title",
    },
    { label: "Most popular", icon: <DiamondIcon />, value: "-total_users" },
    { label: "Newest", icon: <ArrowDiagonalIcon />, value: "-created_at" },
    {
      label: "Oldest",
      icon: <ArrowDiagonalIcon className="rotate-180" />,
      value: "created_at",
    },
  ];

  return (
    <div
      className="absolute -top-18 left-0 w-screen h-screen z-100 md:z-20"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
          handleReset();
        }
      }}
    >
      <form
        className={cn(
          "fixed md:absolute inset-0 md:inset-auto md:top-36 md:right-23 flex flex-col gap-4 md:border md:rounded-xl md:px-4 py-6.5 md:py-4 h-screen md:h-auto w-screen md:w-266 text-sm bg-white z-20",
          {
            "pb-25": isChanged,
          }
        )}
        onSubmit={handleSubmit((data) => onSubmit(setIsOpen, navigate, data))}
      >
        <div className="md:hidden flex justify-between px-4.5 pb-2.5 font-semibold text-gray-500">
          <button type="button" onClick={handleReset}>
            Reset
          </button>

          <h3 className="">FILTERS</h3>

          <CrossIcon
            className="min-h-6 min-w-6"
            onClick={() => {
              setIsOpen(false);
              handleReset();
            }}
          />
        </div>

        <header className="flex flex-col md:flex-row gap-2.5 md:gap-4 md:px-4 items-center">
          <div className="hidden md:flex gap-2 items-center bg-black text-white rounded-xl py-2 px-3">
            <FilterIcon color="white" />
            <span>Filter</span>
          </div>

          <div className="w-screen md:w-auto flex flex-1 gap-2 items-center px-4.5 md:px-6 py-6 md:py-1.5 border-y md:border md:rounded-3xl border-light-gray">
            <SearchIcon />
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              className="border-0 ring-0 p-0 text-sm w-full"
              placeholder="Search"
            />
          </div>

          <div className="flex gap-2 items-center ">
            {isChanged && (
              <div className="fixed md:static bottom-0 left-0 p-5 md:p-0 flex gap-2.5 w-full md:w-auto bg-white md:bg-transparent z-110 md:z-auto">
                <button
                  type="submit"
                  className="px-23 md:px-7 py-4 md:py-2 text-white text-lg md:text-sm font-semibold bg-blue rounded-xl transition hover:cursor-pointer hover:opacity-85"
                >
                  Confirm
                </button>

                <button
                  type="button"
                  className="md:hidden py-4 text-lg text-gray-800 border rounded-xl border-gray-300 font-semibold flex-1"
                  onClick={() => {
                    setIsOpen(false);
                    handleReset();
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

            {!isEmpty && (
              <div className="hidden md:block">
                <span className="text-gray-500 text-xs mx-2">|</span>

                <button
                  type="button"
                  className="text-gray-500 transition hover:cursor-pointer hover:opacity-85"
                  onClick={handleReset}
                >
                  <span className="text-nowrap">Reset all filters</span>
                </button>
              </div>
            )}
            <CrossIcon
              onClick={() => {
                setIsOpen(false);
                handleReset();
              }}
              className="hidden md:block transition hover:cursor-pointer hover:opacity-80"
            />
          </div>

          <div className="md:hidden flex w-full gap-2.5 px-4.5 font-semibold text-gray-400">
            <button
              type="button"
              className={cn(
                "flex-1 py-3.5 border border-transparent rounded-3xl",
                {
                  "border-gray-300 text-blue": activeTab === "filter",
                }
              )}
              onClick={() => setActiveTab("filter")}
            >
              Filter
            </button>

            <button
              type="button"
              className={cn(
                "flex-1 py-3.5 border border-transparent rounded-3xl",
                {
                  "border-gray-300 text-blue": activeTab === "sorting",
                }
              )}
              onClick={() => setActiveTab("sorting")}
            >
              Sorting
            </button>
          </div>
        </header>

        <main className="flex gap-2.5 w-full mt-3 md:mt-0 overflow-y-scroll">
          <section
            className={cn(
              "flex flex-col gap-4 p-4 w-full md:w-158 h-full md:max-h-175 overflow-y-scroll md:border border-light-gray rounded-xl",
              {
                "hidden md:flex": activeTab != "filter",
              }
            )}
          >
            <h6 className="font-semibold text-blue hidden md:inline-block">
              Filter by
            </h6>

            {user && (
              <section className="flex flex-col gap-5 md:gap-4">
                <Controller
                  name="completedFilter"
                  control={control}
                  render={({ field }) => (
                    <ToggleRadioGroup
                      type="filter"
                      options={completedFilterOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />

                <div className="w-full border-b border-gray-200" />
              </section>
            )}

            <section className="flex flex-col gap-5 md:gap-4 font-medium">
              <h6 className="font-semibold">Levels</h6>

              <Controller
                name="difficultyFilter"
                control={control}
                render={({ field }) => (
                  <MultipleChoiceGroup
                    choices={difficulties.filter((difficulty) =>
                      difficulty.name
                        .toLowerCase()
                        .includes(filterSearch.toLowerCase())
                    )}
                    selectedChoices={field.value}
                    setSelectedChoices={field.onChange}
                    name="difficultyFilter"
                  />
                )}
              />

              <div className="w-full border-b border-gray-200" />
            </section>

            <section className="flex flex-col gap-4 font-semibold">
              <h6 className="font-semibold">Categories</h6>

              <Controller
                name="categoryFilter"
                control={control}
                render={({ field }) => (
                  <MultipleChoiceGroup
                    choices={categories.filter((category) =>
                      category.name
                        .toLowerCase()
                        .includes(filterSearch.toLowerCase())
                    )}
                    selectedChoices={field.value}
                    setSelectedChoices={field.onChange}
                    name="categoryFilter"
                  />
                )}
              />
            </section>
          </section>

          <section
            className={cn(
              "flex flex-col gap-6 flex-1 p-4 md:border border-light-gray rounded-xl",
              {
                "hidden md:flex": activeTab != "sorting",
              }
            )}
          >
            <h6 className="font-bold text-blue hidden md:inline-block">
              Sort by
            </h6>

            <div className="px-3">
              <Controller
                name="sortType"
                control={control}
                render={({ field }) => (
                  <ToggleRadioGroup
                    type="sort"
                    options={sortOptions}
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
            </div>
          </section>
        </main>
      </form>
    </div>
  );
}

FilterModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
    })
  ).isRequired,
  filterState: PropTypes.shape({
    completedFilter: PropTypes.string,
    titleSearch: PropTypes.string,
    sortType: PropTypes.string,
    difficultyFilter: PropTypes.arrayOf(PropTypes.string),
    categoryFilter: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default FilterModal;

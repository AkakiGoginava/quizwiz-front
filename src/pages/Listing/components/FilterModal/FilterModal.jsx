import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  CrossIcon,
  FilterIcon,
  SearchIcon,
  ArrowDiagonalIcon,
  ArrowLongIcon,
  DiamondIcon,
} from "@/assets";
import { ToggleRadioGroup, MultipleChoiceGroup, onSubmit } from ".";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth, useDifficulties } from "@/hook";

function FilterModal({ isOpen, setIsOpen, categories, filterState }) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: { ...filterState },
  });
  const { user } = useAuth();
  const navigate = useNavigate();
  const { data: difficulties, isLoading: isLoadingDifficulties } =
    useDifficulties();

  useEffect(() => {
    reset({ ...filterState });
  }, [filterState, reset]);

  if (!isOpen) return null;
  if (isLoadingDifficulties) return <div>...</div>;

  const handleReset = () => {
    reset({
      titleSearch: "",
      sortType: "",
      completedFilter: "",
      difficultyFilter: [],
      categoryFilter: [],
    });
  };

  const completedFilterOptions = [
    { label: "My quizzes", value: "completed" },
    { label: "Not completed", value: "notCompleted" },
  ];

  const sortOptions = [
    { label: "A - Z", icon: <ArrowLongIcon />, value: "title" },
    {
      label: "Z - A",
      icon: <ArrowLongIcon className="rotate-180" />,
      value: "-title",
    },
    { label: "Most popular", icon: <DiamondIcon />, value: "-total_users" },
    { label: "Newest", icon: <ArrowDiagonalIcon />, value: "created_at" },
    {
      label: "Oldest",
      icon: <ArrowDiagonalIcon className="rotate-180" />,
      value: "-created_at",
    },
  ];

  return (
    <div
      className="absolute -top-18 left-0 w-screen h-screen z-30"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          setIsOpen(false);
        }
      }}
    >
      <form
        className="absolute top-36 right-23 flex flex-col gap-4 border rounded-xl p-4 text-sm bg-white z-20"
        onSubmit={handleSubmit((data) => onSubmit(setIsOpen, navigate, data))}
      >
        <header className="flex gap-4 px-4 items-center">
          <div className="flex gap-2 items-center bg-black text-white rounded-xl py-2 px-3">
            <FilterIcon color="white" />
            <span>Filter</span>
          </div>

          <Controller
            name="titleSearch"
            control={control}
            render={({ field }) => (
              <div className="flex gap-2 items-center px-6 py-1.5 border rounded-3xl border-light-gray">
                <SearchIcon />
                <input
                  type="text"
                  {...field}
                  className="border-0 ring-0 p-0 text-sm w-136"
                  placeholder="Search"
                />
              </div>
            )}
          />

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

            {user && (
              <section className="flex flex-col gap-4">
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

            <section className="flex flex-col gap-4">
              <h6 className="font-semibold">Levels</h6>

              <Controller
                name="difficultyFilter"
                control={control}
                render={({ field }) => (
                  <MultipleChoiceGroup
                    choices={difficulties}
                    selectedChoices={field.value}
                    setSelectedChoices={field.onChange}
                    name="difficultyFilter"
                  />
                )}
              />

              <div className="w-full border-b border-gray-200" />
            </section>

            <section className="flex flex-col gap-4">
              <h6 className="font-semibold">Categories</h6>

              <Controller
                name="categoryFilter"
                control={control}
                render={({ field }) => (
                  <MultipleChoiceGroup
                    choices={categories}
                    selectedChoices={field.value}
                    setSelectedChoices={field.onChange}
                    name="categoryFilter"
                  />
                )}
              />
            </section>
          </section>

          <section className="flex flex-col gap-6 flex-1 p-4 border border-light-gray rounded-xl">
            <h6 className="font-bold text-blue">Sort by</h6>

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

import React, { FC } from "react";
import { Category } from "../types";

interface CategoryFilterProps {
  categories: Category[];
  selectedCategories: number[];
  onChange: React.Dispatch<React.SetStateAction<number[]>>;
  isLoading: boolean;
}

const CategoryFilterComponent: FC<CategoryFilterProps> = ({
  categories,
  selectedCategories,
  onChange,
  isLoading,
}) => {
  const handleCategoryChange = (category: number) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((cat) => cat !== category)
      : [...selectedCategories, category];

    onChange(updatedCategories);
  };

  return (
    <div className="my-3">
      <h2 className="text-lg font-bold">Filter by Category:</h2>
      <div className="flex flex-wrap">
        {categories.map((category) => (
          <div className="flex w-min" key={category.id}>
            <input
              type="checkbox"
              id={String(category.id)}
              className="peer hidden"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
              disabled={isLoading}
            />
            <label
              htmlFor={String(category.id)}
              className="select-none cursor-pointer rounded-lg border-2 border-gray-400 py-1.5 px-3 mr-2 font-semibold text-gray-400 transition-colors duration-200 ease-in-out peer-checked:bg-purple-500 peer-checked:text-white peer-checked:font-bold peer-checked:border-purple-500 hover:bg-gray-200"
            >
              {category.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterComponent;

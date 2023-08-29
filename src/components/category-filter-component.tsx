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
    <div>
      <h2>Filter by Category:</h2>
      {categories.map((category) => (
        <label key={category.id}>
          <input
            type="checkbox"
            checked={selectedCategories.includes(category.id)}
            onChange={() => handleCategoryChange(category.id)}
            disabled={isLoading}
          />
          {category.name}
        </label>
      ))}
    </div>
  );
};

export default CategoryFilterComponent;
